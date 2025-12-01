import HomeView from '@/views/HomeView.vue';
import MediaView from "@/views/MediaView.vue";
import ChartDashboard from "@/views/ChartDashboard.vue";
export default [
	{
		path: '/',
		name: 'home',
		component: HomeView,
		meta: { title: 'Home' },
	},
    {
        path: '/media',
        name: 'media',
        component: MediaView,
		meta: { title: 'Media' },

    },
    {path: '/chart', name: 'chart', component: ChartDashboard, meta: { title: 'Chart' }},

	{
		path: '/preview',
		name: 'componentsPreview',
		// Lazy-loaded route
		component: () => import('@/views/PreviewView.vue'),
		meta: { title: 'Components Preview' },
	},
	{
		// 404 fallback
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		component: () => import('@/views/NotFoundView.vue'),
		meta: { title: '404 Not Found' },
	}
];
