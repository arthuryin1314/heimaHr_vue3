export function listToTree(list,root) {
    let arr = []
    list.forEach(element => {
        if(element.pid === root){
            arr.push(element)
            element.children = listToTree(list,element.id)
        }
    });
    return arr
}