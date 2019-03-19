import { routerRedux } from 'dva/router';


const TableLinkChange = (pathname,record,rest) => {
  const { props } = this
  props.dispatch(routerRedux.push({ 
    pathname,
    id:record.id,
    ...rest
  }))
}

export { TableLinkChange }