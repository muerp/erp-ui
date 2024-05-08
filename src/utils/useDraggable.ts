import { Ref, onMounted, onUnmounted, ref } from "vue"

// 创建useDraggable.ts
export const useDraggable = (emit: (key: string, e: any) => void): Ref<HTMLDivElement | null> => {
    // 声明一个 ref，用于存储 div 元素的引用
    const divRef = ref<HTMLDivElement | null>(null)
    // 声明一些变量，用于存储鼠标或触摸位置以及拖拽状态
    let offsetX = 0 // 鼠标点击或触摸点距离 div 左侧的偏移
    let offsetY = 0 // 鼠标点击或触摸点距离 div 顶部的偏移
    let isDragging = false // 是否正在拖拽中
    // 禁用页面滚动的函数
    const disablePageScroll = () => {
        document.body.style.overflow = 'hidden'
    }
    // 启用页面滚动的函数
    const enablePageScroll = () => {
        document.body.style.overflow = 'auto'
    }
    // 开始拖拽，禁用页面滚动
    const startDragging = () => {
        isDragging = true
        disablePageScroll()
    }
    // 停止拖拽，启用页面滚动，并稍后重新启用点击事件
    const stopDragging = () => {
        isDragging = false
        enablePageScroll()
        setTimeout(() => {
            if (divRef.value) {
                divRef.value.style.pointerEvents = 'auto'
            }
        }, 100)
    }
    // 处理鼠标移动或触摸移动事件
    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        requestAnimationFrame(() => {
            if (isDragging && divRef.value) {
                const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
                const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY
                // 阻止事件传播，避免干扰正常滚动
                event.stopPropagation()
                event.preventDefault()
                // 禁用 div 上的点击事件，以避免拖拽时触发点击事件
                divRef.value.style.pointerEvents = 'none'
                emit('drag-move', {
                    offsetX: clientX,
                    offsetY: clientY,
                    e: event
                });
            }
        })
    }
    // 处理鼠标松开或触摸结束事件
    const handleMouseUp = (event: MouseEvent | TouchEvent) => {
        if (isDragging) {
            emit('drag-end', {
                e: event
            });
        }
        // 停止拖拽，恢复点击事件
        stopDragging()
        // 移除鼠标移动事件和触摸移动事件的监听器
        document.removeEventListener('touchmove', handleMouseMove)
        document.removeEventListener('mousemove', handleMouseMove)
        
    }

    // 处理鼠标按下或触摸开始事件
    const handleMouseDown = (event: MouseEvent | TouchEvent) => {
        if (!divRef.value) return
        // 获取鼠标点击或触摸点相对于 div 左侧和顶部的偏移
        offsetX = 'touches' in event ? event.touches[0].clientX - divRef.value.offsetLeft : event.clientX - divRef.value.offsetLeft
        offsetY = 'touches' in event ? event.touches[0].clientY - divRef.value.offsetTop : event.clientY - divRef.value.offsetTop
        // 开始拖拽，添加鼠标移动和触摸移动事件监听器
        startDragging()
        document.addEventListener('mousemove', handleMouseMove, {
            passive: false, // 阻止默认滚动行为
        })
        document.addEventListener('touchmove', handleMouseMove, {
            passive: false, // 阻止默认滚动行为
        })
        // 添加鼠标松开和触摸结束事件监听器
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchend', handleMouseUp)
        event.stopPropagation();
        emit('drag-start', {
            offsetX,
            offsetY,
            e: event
        })
    }
    // 在组件挂载时，添加鼠标按下和触摸开始事件监听器
    onMounted(() => {
        if (divRef.value) {
            divRef.value.addEventListener('mousedown', handleMouseDown)
            divRef.value.addEventListener('touchstart', handleMouseDown)
        }
    })
    // 在组件卸载时，移除事件监听器
    onUnmounted(() => {
        if (divRef.value) {
            divRef.value.removeEventListener('mousedown', handleMouseDown)
            divRef.value.removeEventListener('touchstart', handleMouseDown)
        }
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchend', handleMouseUp)
    })
    // 返回 div 元素的引用，可以在组件中使用该引用来创建可拖拽的元素
    return divRef
}
