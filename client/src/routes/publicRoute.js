import Home  from '../scenes/publicScene/Home'
import Aboutus from '../scenes/publicScene/Aboutus'
import Contact from '../scenes/publicScene/Contact'
import Signup from '../scenes/publicScene/Signup/Signup'
export default {
    home : {
        component : Home,
        path: "/"
    },
    aboutus : { 
        component : Aboutus,
        path: '/about-us'
    },
    contactus : {
        component : Contact,
        path : '/contact'
    },
    signup: {
        component : Signup,
        path: '/signup'
    }
};