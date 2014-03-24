function getDOMObj(s) {
	if(document.getElementById(s))
		return(document.getElementById(s))
	else if(document.all) {
		return(document.all.item(s))
	} else {
    return (null)
  }
}
function makeNameSpace(names) {
  var ns = [] // actually a dict, not sure if {} syntax is well-supported
  for (var i in names) {
    ns[names[i]] = getDOMObj(names[i])
  }
  return ns
}
function placeBlendLayer() {
	eBlend = getDOMObj( 'blendLayer' )
	eContent = getDOMObj( 'content' )
	eBlend.style.height = eContent.offsetHeight + "px"
}
// some data structure utils
function member(x, l) {
  for(i in l) {
    if(x==l[i]) {
      return true
    }
  }
  return false
}
function index(x, l) {
  for (i in l) {
    if(x==l[i]) {
      return i } }
  return false }
function findeq(x, l) {
//HINT:Don't go looking for false. You'll find it.
  for(i in l) {
    if(x==l[i]) {
      return l[i] } }
  return false }
function find(f, l) {
  for (i in l) {
    if (f(l[i])) {
      return l[i] } }
  return false }
