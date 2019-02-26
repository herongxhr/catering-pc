import { template } from '../DataConfig'

export default {
  namespace:'template',
  state: template,
  reducers:{
    'add'(state,payload) {
      return [{...payload,...state}]
    }
  }
}