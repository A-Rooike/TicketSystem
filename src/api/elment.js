import Vue from "vue";
import { Button,Form } from 'element-ui';
import {FormItem} from "element-ui"
import { Input } from "element-ui"
import { Link ,Divider } from "element-ui"
import { Select ,Option } from "element-ui"
import { Autocomplete } from 'element-ui'
import { DatePicker } from 'element-ui'
import { Carousel ,CarouselItem } from 'element-ui'
import { Row, Col} from 'element-ui'
import { Checkbox } from 'element-ui'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import { Empty } from 'element-ui'
import { Loading } from 'element-ui'
import { Step,Steps } from 'element-ui'
import { Submenu,Menu,MenuItemGroup,MenuItem} from 'element-ui'
import { Tabs, TabPane} from 'element-ui'
import { Dialog } from 'element-ui'

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox
Vue.prototype.$confirm = MessageBox.confirm

Vue.use(Form)
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Select)
Vue.use(Option)
Vue.use(Autocomplete)
Vue.use(DatePicker)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Checkbox)
Vue.use(Empty)
Vue.use(Loading)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Submenu)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Dialog)