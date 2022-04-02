export default (state = [], action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'REGISTER':
      return [...state, action.payload];
    default:
      return state;

  }
}
