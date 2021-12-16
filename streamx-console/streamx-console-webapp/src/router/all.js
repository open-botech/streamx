[{
	'path': '/',
	'name': '主页',
	'component': 'BasicView',
	'children': [{
		'path': '/system',
		'name': 'System',
		'component': 'PageView',
		'meta': {
			'closeable': true,
			'hidden': false,
			'keepAlive': true,
			'icon': 'desktop'
		},
		'children': [{
			'path': '/system/user',
			'name': 'User Management',
			'component': 'system/user/User',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'user'
			}
		}, {
			'path': '/system/role',
			'name': 'Role Management',
			'component': 'system/role/Role',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'smile'
			}
		}, {
			'path': '/system/menu',
			'name': 'Router Management',
			'component': 'system/menu/Menu',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'bars'
			}
		}]
	}, {
		'path': '/flink',
		'name': 'StreamX',
		'component': 'PageView',
		'meta': {
			'closeable': true,
			'hidden': false,
			'keepAlive': true,
			'icon': 'build'
		},
		'children': [{
			'path': '/flink/app/add',
			'name': 'Add Application',
			'component': 'flink/app/Add',
			'meta': {
				'closeable': true,
				'hidden': true,
				'keepAlive': true,
				'icon': ''
			}
		}, {
			'path': '/flink/app/detail',
			'name': 'App Detail',
			'component': 'flink/app/Detail',
			'meta': {
				'closeable': true,
				'hidden': true,
				'keepAlive': true,
				'icon': ''
			}
		}, {
			'path': '/flink/app/edit_flink',
			'name': 'Edit Flink App',
			'component': 'flink/app/EditFlink',
			'meta': {
				'closeable': true,
				'hidden': true,
				'keepAlive': true,
				'icon': ''
			}
		}, {
			'path': '/flink/project/add',
			'name': 'Add Project',
			'component': 'flink/project/Add',
			'meta': {
				'closeable': true,
				'hidden': true,
				'keepAlive': true,
				'icon': ''
			}
		}, {
			'path': '/flink/app/edit_streamx',
			'name': 'Edit StreamX App',
			'component': 'flink/app/EditStreamX',
			'meta': {
				'closeable': true,
				'hidden': true,
				'keepAlive': true,
				'icon': ''
			}
		}, {
			'path': '/flink/project',
			'name': 'Project',
			'component': 'flink/project/View',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'github'
			}
		}, {
			'path': '/flink/app',
			'name': 'Application',
			'component': 'flink/app/View',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'mobile'
			}
		}, {
			'path': '/flink/notebook/view',
			'name': 'Notebook',
			'component': 'flink/notebook/Submit',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'read'
			}
		}, {
			'path': '/flink/setting',
			'name': 'Setting',
			'component': 'flink/setting/View',
			'meta': {
				'closeable': true,
				'hidden': false,
				'keepAlive': true,
				'icon': 'setting'
			}
		}]
	}]
}]