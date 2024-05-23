/**
 * Author:  Godfrey
 * Date:    23/5/2024
 * Time:    16:24
 * Email:   yxw770@gmail.com
 * Class index
 */
import {shallowRef, h, onBeforeUnmount, ref} from "vue";
import SubHeader from './SubHeader.vue'
export { default } from './SubLayout.vue'

export const Header = shallowRef(SubHeader)

/**
 * 设置当前状态栏
 * @param Component
 * @param props
 * @param children
 */
export function setCustomNavbar(Component, props={}, children){
    Header.value = h(Component, props, () => children)
    onBeforeUnmount(() => {
        Header.value = SubHeader
    })
}


export const style = ref({})

/**
 * 设置自定义layout样式
 * @param styleSheet
 */
export function setCustomStyle(styleSheet){
    style.value = styleSheet
    onBeforeUnmount(() => {
        style.value = {}
    })
}
