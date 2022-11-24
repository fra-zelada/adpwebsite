import { IOponent } from "../interfaces/match";


export const calcPercentage = ( oponents : IOponent[]) => {
        
    
    let sum = 0;
    oponents.map(({votes = 0}) => { sum = sum + votes });
    
    var result = oponents.map(({name, votes = 0, _id}) => (
        { name , _id, votes, percentage : +((100 * votes) / sum).toFixed(1) || 0  }))
    

    return result;

};