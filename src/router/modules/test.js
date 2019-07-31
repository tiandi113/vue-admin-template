import Layout from '@/layout'
//
const testRouter = [
  {
    path: '/test',
    component: Layout,
    name: 'test',
    meta: {
      title: '测试',
      icon: 'upload'
    },
    children: [
      {
        path: '/SmplePage',
        component: () => import('@/views/test/simplePage'),
        name: 'SimplePage',
        redirect: '/SmplePage',
        meta: { title: 'SmplePage', icon: 'image' }
      },
      {
        path: '/Test',
        component: () => import('@/views/test/test'),
        name: 'Test',
        meta: { title: 'excel', icon: 'excel' }
      }
    ]
  }
]

export default testRouter
