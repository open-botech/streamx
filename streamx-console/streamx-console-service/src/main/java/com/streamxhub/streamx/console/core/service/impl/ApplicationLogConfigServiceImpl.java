/*
 * Copyright (c) 2019 The StreamX Project
 * <p>
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package com.streamxhub.streamx.console.core.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.streamxhub.streamx.common.util.DeflaterUtils;
import com.streamxhub.streamx.common.util.Utils;
import com.streamxhub.streamx.console.base.domain.Constant;
import com.streamxhub.streamx.console.base.domain.RestRequest;
import com.streamxhub.streamx.console.base.util.SortUtils;
import com.streamxhub.streamx.console.base.util.WebUtils;
import com.streamxhub.streamx.console.core.dao.ApplicationLogConfigMapper;
import com.streamxhub.streamx.console.core.entity.Application;
import com.streamxhub.streamx.console.core.entity.ApplicationLogConfig;
import com.streamxhub.streamx.console.core.enums.EffectiveType;
import com.streamxhub.streamx.console.core.service.ApplicationLogConfigService;
import com.streamxhub.streamx.console.core.service.EffectiveService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Base64;
import java.util.Date;
import java.util.List;

/**
 * @author benjobs
 */
@Slf4j
@Service
@Transactional(propagation = Propagation.SUPPORTS, readOnly = true, rollbackFor = Exception.class)
public class ApplicationLogConfigServiceImpl
        extends ServiceImpl<ApplicationLogConfigMapper, ApplicationLogConfig>
        implements ApplicationLogConfigService {

    private String flinkLogConfTemplate = null;

    private String PROD_ENV_NAME = "prod";

    @Autowired
    private ApplicationContext context;

    @Autowired
    private EffectiveService effectiveService;

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public synchronized void create(Application application, Boolean latest) {
        String decode = new String(Base64.getDecoder().decode(application.getLogConfig()));
        String config = DeflaterUtils.zipString(decode.trim());

        ApplicationLogConfig applicationLogConfig = new ApplicationLogConfig();
        applicationLogConfig.setAppId(application.getId());
        applicationLogConfig.setContent(config);
        applicationLogConfig.setCreateTime(new Date());
        Integer version = this.baseMapper.getLastVersion(application.getId());
        applicationLogConfig.setVersion(version == null ? 1 : version + 1);
        save(applicationLogConfig);
        this.setLatestOrEffective(latest, applicationLogConfig.getId(), application.getId());
    }

    @Transactional(rollbackFor = {Exception.class})
    public void setLatest(Long appId, Long logConfigId) {
        LambdaUpdateWrapper<ApplicationLogConfig> updateWrapper = new UpdateWrapper<ApplicationLogConfig>().lambda();
        updateWrapper.set(ApplicationLogConfig::getLatest, 0)
                .eq(ApplicationLogConfig::getAppId, appId);
        this.update(updateWrapper);

        updateWrapper = new UpdateWrapper<ApplicationLogConfig>().lambda();
        updateWrapper.set(ApplicationLogConfig::getLatest, 1)
                .eq(ApplicationLogConfig::getId, logConfigId);
        this.update(updateWrapper);
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public synchronized void update(Application application, Boolean latest) {
        //flink sql job
        ApplicationLogConfig latestConfig = getLatest(application.getId());

        //获取当前正在生效的配置
        ApplicationLogConfig effectiveConfig = getEffective(application.getId());
        //删除配置了...
        if (Utils.isEmpty(application.getConfig())) {
            if (effectiveConfig != null) {
                //删除..
                effectiveService.delete(application.getId(), EffectiveType.LOGCONFIG);
            }
        } else {
            //之前没有配置,本次新增了配置...
            if (effectiveConfig == null) {
                if (latestConfig != null) {
                    removeById(latestConfig.getId());
                }
                this.create(application, latest);
            } else {
                String decode = new String(Base64.getDecoder().decode(application.getConfig()));
                String encode = DeflaterUtils.zipString(decode.trim());
                //需要对比两次配置是否一致,
                if (!effectiveConfig.getContent().equals(encode)) {
                    if (latestConfig != null) {
                        removeById(latestConfig.getId());
                    }
                    this.create(application, latest);
                }
            }
        }
    }

    /**
     * 未运行的任务设置为Effective
     * 正在运行的设置成Latest,"Latest"仅仅是个标记
     */
    @Override
    public void setLatestOrEffective(Boolean latest, Long configId, Long appId) {
        if (latest) {
            this.setLatest(appId, configId);
        } else {
            this.toEffective(appId, configId);
        }
    }

    @Override
    public void toEffective(Long appId, Long configId) {
        this.baseMapper.clearLatest(appId);
        effectiveService.saveOrUpdate(appId, EffectiveType.LOGCONFIG, configId);
    }

    @Override
    public ApplicationLogConfig getLatest(Long appId) {
        return baseMapper.getLatest(appId);
    }

    @Override
    @Transactional(rollbackFor = {Exception.class})
    public ApplicationLogConfig getEffective(Long appId) {
        return baseMapper.getEffective(appId);
    }

    @Override
    public ApplicationLogConfig get(Long id) {
        ApplicationLogConfig config = getById(id);
        if (config.getContent() != null) {
            String unzipString = DeflaterUtils.unzipString(config.getContent());
            String encode = Base64.getEncoder().encodeToString(unzipString.getBytes());
            config.setContent(encode);
        }
        return config;
    }

    @Override
    public IPage<ApplicationLogConfig> page(ApplicationLogConfig config, RestRequest request) {
        Page<ApplicationLogConfig> page = new Page<>();
        SortUtils.handlePageSort(request, page, "version", Constant.ORDER_DESC, false);
        return this.baseMapper.page(page, config.getAppId());
    }

    @Override
    public List<ApplicationLogConfig> history(Application application) {
        LambdaQueryWrapper<ApplicationLogConfig> wrapper = new QueryWrapper<ApplicationLogConfig>().lambda();
        wrapper.eq(ApplicationLogConfig::getAppId, application.getId())
                .orderByDesc(ApplicationLogConfig::getVersion);

        List<ApplicationLogConfig> configList = this.baseMapper.selectList(wrapper);
        ApplicationLogConfig effective = getEffective(application.getId());

        for (ApplicationLogConfig config : configList) {
            if (config.getId().equals(effective.getId())) {
                config.setEffective(true);
                break;
            }
        }
        return configList;
    }

    @Override
    public synchronized String readTemplate() {
        if (flinkLogConfTemplate == null) {
            String profiles = context.getEnvironment().getActiveProfiles()[0];
            String path;
            if (profiles.equals(PROD_ENV_NAME)) {
                //生产环境部署读取conf/flink-application.template
                path = WebUtils.getAppDir("conf").concat("/flink-log4j.template");
            } else {
                URL url = Thread.currentThread().getContextClassLoader().getResource("flink-log4j.template");
                assert url != null;
                path = url.getPath();
            }
            File file = new File(path);
            try {
                String conf = FileUtils.readFileToString(file);
                this.flinkLogConfTemplate = Base64.getEncoder().encodeToString(conf.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return this.flinkLogConfTemplate;
    }

    @Override
    public void removeApp(Long appId) {
        baseMapper.removeApp(appId);
    }
}
