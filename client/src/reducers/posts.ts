export default (state = [], action: any) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...state, action.payload];
    case 'DELETE':
      return [...state, action.payload];
    default:
      return state;

  }
}
