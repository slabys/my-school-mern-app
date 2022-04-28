export default (state = [], action: any) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      return [...state, ...action.payload]
    default:
      return state;

  }
}
