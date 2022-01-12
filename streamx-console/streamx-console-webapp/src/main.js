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
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import bootstrap from './core/bootstrap'
import $ from 'jquery'
import { VuePlugin } from 'vuera'
import '@/assets/less/patch.less'
import './core/use'
import './core/prototype'
import './utils/filter' // global filter
Vue.use(VuePlugin)
Vue.config.productionTip = false

window.app = new Vue({
  router,
  store,
  $,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
