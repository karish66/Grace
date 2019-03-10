import Dashboard from '../scenes/privateScene/Dashboard'
import Settings from '../scenes/privateScene/Settings'
import Logs from '../scenes/privateScene/Logs/Logs';
export default {
    Dashboard : {
        component : Dashboard,
        path: '/dashboard'
    },
    settings : {
        component: Settings,
        path : '/settings'
    },
    templates : {
        component : Logs,
        path:'/dashboard/logs'
    }
    
}