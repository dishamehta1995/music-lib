export default (state, action) => {
    let list  = state.list;
    let name;
    switch(action.type) {
      case 'LOAD_MUSIC':
        let allmusic = action.payload
        return {
          ...state,
          isSearchActive:false,
          list: allmusic,
          loading: false,
          error:null,
          foundList: [],
          searchCategory : [...state.searchCategory]
        }
        
      case 'SEARCH_MUSIC':
          name  = action.payload
          let filterList = []
          const escapeRegExpMatch = function(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          };
          const isExactMatch = (str, match) => {
            return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`).test(str)
          }
        
          state.searchCategory.forEach((i) => {
            let key = i.toLowerCase();
            if(key === 'title'){
              filterList = [...filterList, ...state.list.filter(item=>{
                let found = []
                name.forEach((list,j) => {
                  if(list != "" && isExactMatch(item[key].toLowerCase(), list.toLowerCase()) ) {
                    found = [...found, item] 
                  }
                })
                return found.length
              })]
            }
            else{
              let list  = state.list.filter(item =>{
                let found = []
                item[key].forEach((val,i) => {
                  name.forEach((list,j) => {
                    if(list != "" && isExactMatch(val.toLowerCase(), list.toLowerCase())) {
                      console.log(val)
                      found = [...found, item] 
                    }
                  })

                })
                return found.length > 0
              })
              filterList = [...filterList,...list]
              console.log(filterList)
            }
          })

        return {
            ...state,
                isSearchActive:true,
                loading: false,
                error:null,
                list: [...state.list],
                searchCategory : [...state.searchCategory],
                foundList: filterList,
        }        
                
      case 'SEARCH_CATEGORY':
        let catList  = action.payload
        return {
            ...state,
                isSearchActive:true,
                loading: false,
                error:null,
                list: [...state.list],
                searchCategory : [...catList]
        }        
        
      default:
        return state;
    }
  }
