import { PropType } from "vue"

export const getClientXY = (event: MouseEvent | TouchEvent) => {
    let clientX: number
    let clientY: number
    if (event.type.startsWith('touch')) {
      clientY = (event as TouchEvent).touches[0].clientY
      clientX = (event as TouchEvent).touches[0].clientX
    } else {
      clientY = (event as MouseEvent).clientY
      clientX = (event as MouseEvent).clientX
    }
    return {
      clientX,
      clientY,
    }
  }
  export const isNumber = (val: any): val is number => typeof val === 'number'

  export const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {
      return false
    }
    return !Number.isNaN(Number(val))
  }
  
  export const isString = (val: any) => {
    return typeof val === 'string';
  }

  export const definePropType = <T>(val: any): PropType<T> => val

  export const addUnit = (value?: string | number, defaultUnit = 'px') => {
    if (!value) return ''
    if (isNumber(value) || isStringNumber(value)) {
      return `${value}${defaultUnit}`
    } else if (isString(value)) {
      return value
    }
  }