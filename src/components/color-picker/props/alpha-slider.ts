import type { ExtractPropTypes } from 'vue'
import type Color from '../utils/color'
import { definePropType } from '../utils'
export const alphaSliderProps = {
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
}

export type AlphaSliderProps = ExtractPropTypes<typeof alphaSliderProps>
