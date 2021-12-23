/*
 * Copyright (c) 2019 The StreamX Project
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.streamxhub.streamx.console.core.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.google.common.collect.Maps;
import com.streamxhub.streamx.console.base.util.JsonUtils;
import com.streamxhub.streamx.flink.packer.pipeline.PipeErr;
import com.streamxhub.streamx.flink.packer.pipeline.PipeStatus;
import com.streamxhub.streamx.flink.packer.pipeline.PipeStepStatus;
import com.streamxhub.streamx.flink.packer.pipeline.PipeType;
import com.streamxhub.streamx.flink.packer.pipeline.BuildResult;
import com.streamxhub.streamx.flink.packer.pipeline.BuildPipelineHelper;
import com.streamxhub.streamx.flink.packer.pipeline.BuildPipeline;
import com.streamxhub.streamx.flink.packer.pipeline.PipeSnapshot;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Building pipeline state for Application.
 * Each Application instance will have only one corresponding ApplicationBuildPipeline record.
 *
 * @author Al-assad
 */
@TableName("t_app_build_pipe")
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class AppBuildPipeline {

    @TableId(value = "app_id")
    private Long appId;

    @TableField(value = "pipe_type")
    private Integer pipeTypeCode;

    @TableField(value = "pipe_status")
    private Integer pipeStatusCode;

    @TableField(value = "cur_step")
    private Integer curStep;

    @TableField(value = "total_step")
    private Integer totalStep;

    // step status map: (stepSeq -> stepStatus)
    @TableField(value = "steps_status")
    private String stepStatusJson;

    // step status update timestamp map: (stepSeq -> update timestamp)
    @TableField(value = "steps_status_ts")
    private String stepStatusTimestampJson;

    @TableField(value = "error")
    private String errorJson;

    @TableField(value = "build_result")
    private String buildResultJson;

    @TableField(value = "update_time")
    private Date updateTime;

    @Nonnull
    @JsonIgnore
    public PipeType getPipeType() {
        return PipeType.of(pipeTypeCode);
    }

    @JsonIgnore
    public AppBuildPipeline setPipeType(@Nonnull PipeType pipeType) {
        this.pipeTypeCode = pipeType.getCode();
        return this;
    }

    @Nonnull
    @JsonIgnore
    public PipeStatus getPipeStatus() {
        return PipeStatus.of(pipeStatusCode);
    }

    @JsonIgnore
    public AppBuildPipeline setPipeStatus(@Nonnull PipeStatus pipeStatus) {
        this.pipeStatusCode = pipeStatus.getCode();
        return this;
    }

    @Nonnull
    @JsonIgnore
    public Map<Integer, PipeStepStatus> getStepStatus() {
        if (StringUtils.isBlank(stepStatusJson)) {
            return Maps.newHashMap();
        }
        try {
            return JsonUtils.read(stepStatusJson, new TypeReference<HashMap<Integer, PipeStepStatus>>() {
            });
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, stepStatusJson={}", stepStatusJson, e);
            return Maps.newHashMap();
        }
    }

    @JsonIgnore
    public AppBuildPipeline setStepStatus(@Nonnull Map<Integer, PipeStepStatus> stepStatus) {
        try {
            this.stepStatusJson = JsonUtils.write(stepStatus);
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, stepStatusMap=({})",
                stepStatus.entrySet().stream().map(et -> et.getKey() + "->" + et.getValue()).collect(Collectors.joining(",")), e);
        }
        return this;
    }

    @Nonnull
    @JsonIgnore
    public Map<Integer, Long> getStepStatusTimestamp() {
        if (StringUtils.isBlank(stepStatusTimestampJson)) {
            return Maps.newHashMap();
        }
        try {
            return JsonUtils.read(stepStatusTimestampJson, new TypeReference<HashMap<Integer, Long>>() {
            });
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, stepStatusJson={}", stepStatusTimestampJson, e);
            return Maps.newHashMap();
        }
    }

    @JsonIgnore
    public AppBuildPipeline setStepStatusTimestamp(@Nonnull Map<Integer, Long> stepStatusSt) {
        try {
            this.stepStatusTimestampJson = JsonUtils.write(stepStatusSt);
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, stepStatusSt=({})",
                stepStatusSt.entrySet().stream().map(et -> et.getKey() + "->" + et.getValue()).collect(Collectors.joining(",")), e);
        }
        return this;
    }

    @Nonnull
    @JsonIgnore
    public PipeErr getError() {
        if (StringUtils.isBlank(errorJson)) {
            return PipeErr.empty();
        }
        try {
            return JsonUtils.read(errorJson, PipeErr.class);
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, errorJson={}", errorJson, e);
            return PipeErr.empty();
        }
    }

    @JsonIgnore
    public AppBuildPipeline setError(@Nonnull PipeErr error) {
        try {
            this.errorJson = JsonUtils.write(error);
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, error={}", error, e);
        }
        return this;
    }

    @JsonIgnore
    public <R extends BuildResult> AppBuildPipeline setBuildResult(@Nonnull R result) {
        try {
            this.buildResultJson = JsonUtils.write(result);
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, buildResult={}", result, e);
        }
        return this;
    }

    public long calCostSecond() {
        // max timestamp - min timestamp in stepStatusTimestamp
        Map<Integer, Long> st = getStepStatusTimestamp();
        if (st.isEmpty()) {
            return 0;
        }
        long max = st.values().stream().max(Long::compareTo).orElse(0L);
        long min = st.values().stream().min(Long::compareTo).orElse(0L);
        return (max - min) / 1000;
    }

    /**
     * Only return null when getPipeType() = UNKNOWN or json covert error,
     * The return class type depend on PipeType.ResultType.
     */
    @SuppressWarnings("unchecked")
    @Nullable
    @JsonIgnore
    public <R extends BuildResult> R getBuildResult() {
        PipeType pipeType = getPipeType();
        if (pipeType.isUnknown()) {
            return null;
        }
        try {
            return (R) JsonUtils.read(buildResultJson, pipeType.getResultType());
        } catch (JsonProcessingException e) {
            log.error("json parse error on ApplicationBuildPipeline, buildResultJson={}", buildResultJson, e);
            return null;
        }
    }

    /**
     * Initialize from BuildPipeline
     */
    public static AppBuildPipeline initFromPipeline(@Nonnull BuildPipeline pipeline) {
        return fromPipeSnapshot(pipeline.snapshot());
    }

    /**
     * Create object from PipeSnapshot
     */
    public static AppBuildPipeline fromPipeSnapshot(@Nonnull PipeSnapshot snapshot) {
        return new AppBuildPipeline()
            .setPipeType(snapshot.pipeType())
            .setPipeStatus(snapshot.pipeStatus())
            .setTotalStep(snapshot.allSteps())
            .setCurStep(snapshot.curStep())
            .setStepStatus(snapshot.pureStepStatusAsJava())
            .setStepStatusTimestamp(snapshot.stepStatusTimestampAsJava())
            .setError(snapshot.error())
            .setUpdateTime(new Date(snapshot.emitTime()));
    }

    /**
     * Covert to view object
     */
    public View toView() {
        return View.of(this);
    }



    /**
     * View object of AppBuildPipeline
     */
    @Data
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class View {
        private Long appId;
        private Integer pipeType;
        private Integer pipeStatus;
        private Integer curStep;
        private Integer totalStep;
        private Double percent;
        private Long costSec;
        private List<Step> steps;
        private Boolean isErr;
        private String errSummary;
        private String errStack;
        private Date updateTime;

        public static View of(@Nonnull AppBuildPipeline pipe) {
            // combine step info
            Map<Integer, String> stepDesc = pipe.getPipeType().getSteps();
            Map<Integer, PipeStepStatus> stepStatus = pipe.getStepStatus();
            Map<Integer, Long> stepTs = pipe.getStepStatusTimestamp();
            List<Step> steps = new ArrayList<>(stepDesc.size());
            for (int i = 1; i <= pipe.getPipeType().getSteps().size(); i++) {
                Step step = new Step()
                    .setSeq(i)
                    .setDesc(stepDesc.getOrDefault(i, "unknown step"))
                    .setStatus(stepStatus.getOrDefault(i, PipeStepStatus.unknown).getCode());
                Long st = stepTs.get(i);
                if (st != null) {
                    step.setTs(new Date(st));
                }
                steps.add(step);
            }
            return new View()
                .setAppId(pipe.getAppId())
                .setPipeType(pipe.getPipeTypeCode())
                .setPipeStatus(pipe.getPipeStatusCode())
                .setCurStep(pipe.getCurStep())
                .setTotalStep(pipe.getTotalStep())
                .setPercent(BuildPipelineHelper.calPercent(pipe.getCurStep(), pipe.getTotalStep()))
                .setCostSec(pipe.calCostSecond())
                .setSteps(steps)
                .setIsErr(pipe.getError().nonEmpty())
                .setErrSummary(pipe.getError().summary())
                .setErrStack(pipe.getError().exceptionStack())
                .setUpdateTime(pipe.getUpdateTime());
        }
    }

    @Data
    @Accessors(chain = true)
    @NoArgsConstructor
    public static class Step {
        private Integer seq;
        private String desc;
        private Integer status;
        private Date ts;
    }
}
