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

const STREAMXAPI = '/streamxApi'
const DAASAPI = '/daasApi'

export default {
  Passport: {
    SIGNIN: STREAMXAPI + '/passport/signin',
    SIGNOUT: STREAMXAPI + '/passport/signout'
  },
  Project: {
    BRANCHES: STREAMXAPI + '/flink/project/branches',
    GITCHECK: STREAMXAPI + '/flink/project/gitcheck',
    EXISTS: STREAMXAPI + '/flink/project/exists',
    CREATE: STREAMXAPI + '/flink/project/create',
    BUILD: STREAMXAPI + '/flink/project/build',
    CLOSEBUILD: STREAMXAPI + '/flink/project/closebuild',
    LIST: STREAMXAPI + '/flink/project/list',
    FILELIST: STREAMXAPI + '/flink/project/filelist',
    MODULES: STREAMXAPI + '/flink/project/modules',
    LISTCONF: STREAMXAPI + '/flink/project/listconf',
    JARS: STREAMXAPI + '/flink/project/jars',
    DELETE: STREAMXAPI + '/flink/project/delete',
    SELECT: STREAMXAPI + '/flink/project/select',
    PROJAR:STREAMXAPI + '/flink/project/upload'
  },
  Tutorial: {
    GET: STREAMXAPI + '/tutorial/get'
  },
  NoteBook: {
    SUBMIT: STREAMXAPI + '/flink/notebook/submit'
  },
  Metrics: {
    FLAMEGRAPH: STREAMXAPI + '/metrics/flamegraph',
    NOTICE: STREAMXAPI + '/metrics/notice',
    DELNOTICE: STREAMXAPI + '/metrics/delnotice'
  },
  SavePoint: {
    LATEST: STREAMXAPI + '/flink/savepoint/latest',
    HISTORY: STREAMXAPI + '/flink/savepoint/history',
    DELETE: STREAMXAPI + '/flink/savepoint/delete'
  },
  Application: {
    READCONF: STREAMXAPI + '/flink/app/readConf',
    UPDATE: STREAMXAPI + '/flink/app/update',
    UPLOAD: STREAMXAPI + '/flink/app/upload',
    DEPLOY: STREAMXAPI + '/flink/app/deploy',
    MAPPING: STREAMXAPI + '/flink/app/mapping',
    YARN: STREAMXAPI + '/flink/app/yarn',
    LIST: STREAMXAPI + '/flink/app/list',
    GET: STREAMXAPI + '/flink/app/get',
    DASHBOARD: STREAMXAPI + '/flink/app/dashboard',
    MAIN: STREAMXAPI + '/flink/app/main',
    NAME: STREAMXAPI + '/flink/app/name',
    EXISTS: STREAMXAPI + '/flink/app/exists',
    CANCEL: STREAMXAPI + '/flink/app/cancel',
    DELETE: STREAMXAPI + '/flink/app/delete',
    DELETEBAK: STREAMXAPI + '/flink/app/deletebak',
    CREATE: STREAMXAPI + '/flink/app/create',
    START: STREAMXAPI + '/flink/app/start',
    CLEAN: STREAMXAPI + '/flink/app/clean',
    BACKUPS: STREAMXAPI + '/flink/app/backups',
    ROLLBACK: STREAMXAPI + '/flink/app/rollback',
    REVOKE: STREAMXAPI + '/flink/app/revoke',
    STARTLOG: STREAMXAPI + '/flink/app/startlog',
    CHECKJAR: STREAMXAPI + '/flink/app/checkjar',
  },
  Config: {
    GET: STREAMXAPI + '/flink/conf/get',
    TEMPLATE: STREAMXAPI + '/flink/conf/template',
    LIST: STREAMXAPI + '/flink/conf/list',
    HISTORY: STREAMXAPI + '/flink/conf/history',
    DELETE: STREAMXAPI + '/flink/conf/delete'
  },
  FlinkEnv: {
    LIST: STREAMXAPI + '/flink/env/list',
    CREATE:  STREAMXAPI + '/flink/env/create',
    EXISTS: STREAMXAPI + '/flink/env/exists',
    GET: STREAMXAPI + '/flink/env/get',
    SYNC: STREAMXAPI + '/flink/env/sync',
    UPDATE: STREAMXAPI + '/flink/env/update',
    DEFAULT: STREAMXAPI + '/flink/env/default',
  },
  FlinkSQL: {
    VERIFY: STREAMXAPI + '/flink/sql/verify',
    GET: STREAMXAPI + '/flink/sql/get',
    HISTORY: STREAMXAPI + '/flink/sql/history',
    KINSHIP: STREAMXAPI + '/flink/sql/lineage'
  },
  SETTING: {
    GET: STREAMXAPI + '/flink/setting/get',
    WEBURL: STREAMXAPI + '/flink/setting/weburl',
    ALL: STREAMXAPI + '/flink/setting/all',
    GETFLINK: STREAMXAPI + '/flink/setting/getflink',
    SYNC: STREAMXAPI + '/flink/setting/sync',
    UPDATE: STREAMXAPI + '/flink/setting/update'
  },
  User: {
    EXECUSER: STREAMXAPI + '/user/execUser',
    LIST: STREAMXAPI + '/user/list',
    UPDATE: STREAMXAPI + '/user/update',
    PASSWORD: STREAMXAPI + '/user/password',
    RESET: STREAMXAPI + '/user/password/reset',
    GET: STREAMXAPI + '/user/get',
    POST: STREAMXAPI + '/user/post',
    DELETE: STREAMXAPI + '/user/delete',
    CHECK_NAME: STREAMXAPI + '/user/check/name',
    CHECK_PASSWORD: STREAMXAPI + '/user/check/password'
  },
  Role: {
    POST: STREAMXAPI + '/role/post',
    UPDATE: STREAMXAPI + '/role/update',
    LIST: STREAMXAPI + '/role/list',
    CHECK_NAME: STREAMXAPI + '/role/check/name',
    DELETE: STREAMXAPI + '/role/delete',
    MENU: STREAMXAPI + '/role/menu'
  },
  Menu: {
    LIST: STREAMXAPI + '/menu/list',
    DELETE: STREAMXAPI + '/menu/delete',
    POST: STREAMXAPI + '/menu/post',
    UPDATE: STREAMXAPI + '/menu/update',
    ROUTER: STREAMXAPI + '/menu/router'
  },
  Log: {
    LIST: STREAMXAPI + '/log/list',
    DELETE: STREAMXAPI + '/log/delete',
  },
  DataSource: {
    LIST: DAASAPI + '/metadataSource/source',
    TABLE: DAASAPI + '/metadataTable/tables'
  }
}
