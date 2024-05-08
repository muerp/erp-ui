import { useSizeProp } from 'element-plus'

import type { ComputedRef, ExtractPropTypes, InjectionKey } from 'vue'
import type ColorPicker from './color-picker.vue'

export const colorPickerProps = {
  /**
   * @description binding value
   */
  modelValue: String,
  /**
   * @description ColorPicker id
   */
  id: String,
  /**
   * @description whether to display the alpha slider
   */
  showAlpha: Boolean,
  /**
   * @description color format of v-model
   */
  colorFormat: String,
  /**
   * @description whether to disable the ColorPicker
   */
  disabled: Boolean,
  /**
   * @description size of ColorPicker
   */
  size: useSizeProp,
  /**
   * @description custom class name for ColorPicker's dropdown
   */
  popperClass: {
    type: String,
    default: '',
  },
  /**
   * @description ColorPicker aria-label
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * @description ColorPicker tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description predefined color options
   */
  predefine: {
    type: Array<string>,
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
}
export const colorPickerEmits = ['update:modelValue', 'change', 'active-change', 'focus', 'blur']
export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerInstance = InstanceType<typeof ColorPicker>

export interface ColorPickerContext {
  currentColor: ComputedRef<string>
}

export const colorPickerContextKey: InjectionKey<ColorPickerContext> = Symbol(
  'colorPickerContextKey'
)
