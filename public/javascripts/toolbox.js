var ajax = false;
/* var HOSTNAME = "http://bl-ldlp-nhansen.ads.iu.edu:8080"; */
var HOSTNAME = "http://129.79.32.53:3002";
var savedSearchElement = false;
var processResultMarkingQueue = new Array();

function getDOMObj(s) {
	if(document.getElementById(s))
		return(document.getElementById(s));
	if(document.all) {
		return(document.all.item(s));
	}
	return(null);
}

function advancedPageSetup() {
  lc=getDOMObj('leftColumn');
  lcHeight=lc.offsetHeight;
  nCon = getDOMObj( 'content' );
  nConHeight = nCon.offsetHeight;
  nCon.style.width = ( nCon.offsetWidth - 275 ) + "px";
	if ( lc.offsetHeight >= nCon.offsetHeight ) {
		iDiff = ( ( lc.offsetHeight - nCon.offsetHeight ) / 2 );
	}
	else {
		iDiff = 10;
	}
  nCon.style.marginTop = iDiff + "px";
  bl = getDOMObj( 'blendLayer' );
  bl.style.width = nCon.offsetWidth + "px";
  bl.style.height = nCon.offsetHeight + "px";
  bl.style.marginTop = iDiff + "px";
  bl.style.display="block";
  pB = getDOMObj( 'pageBox' );
  pB.style.height = ( nCon.offsetHeight + 20 ) + "px";
  fe = getDOMObj( 'footer' );
  fe.style.display = "block";
	document.getElementById( "query" ).value = "";
	document.getElementById( "qLabel0" ).value = "";
	document.getElementById( "qToken0" ).value = "";
	document.getElementById( "qConnector1" ).value = "AND";
	document.getElementById( "qLabel1" ).value = "";
	document.getElementById( "qToken1" ).value = "";
	document.getElementById( "qConnector2" ).value = "AND";
	document.getElementById( "qLabel2" ).value = "";
	document.getElementById( "qToken2" ).value = "";

  document.getElementById( "qToken0" ).focus();
}

function clearResultsPitch() {
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	    ajax = new XMLHttpRequest();
	    if( ajax.overrideMimeType ) {
		ajax.overrideMimeType( 'text/xml' );
	    }
	}
	else if (window.ActiveXObject) { // IE
	    try {
		ajax = new ActiveXObject("Msxml2.XMLHTTP");
	    }
	    catch (e) {
		try {
		    ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e) {}
	    }
	}
	ajax.onreadystatechange = clearResultsCatch;
	ajax.open( "GET", HOSTNAME + "/Collections/clearResults.html", true );
	ajax.send( null );
}

function clearAllResultsOnPage() {
  /* get all resultItem divs */
  nListDivs = document.getElementsByTagName( "div" );
  var nDivs = new Array();
  iDivs = 0;
  for( i = 0; i < nListDivs.length; i++ ) {
       nDiv = nListDivs[ i ];
       try {
	   if( nDiv.attributes[ "class" ].nodeValue == "resultItem" ) {
		    nDivs[ iDivs ] = nDiv;
		    iDivs++;
	    }
	}
	 catch( e ) { /* no attribute "class" for node, which is fine.  This is shorter than doing another check to see if the attribute exists first. */ }
  }
/* iterate over result Item divs */
  for( i = 0; i < nDivs.length; i++ ) {
       /* find & push img */
       elImg = nDivs[ i ].getElementsByTagName( "p" )[ 0 ].getElementsByTagName( "img" )[ nDivs[ i ].getElementsByTagName( "p" )[ 0 ].getElementsByTagName( "img" ).length -1 ];
       if( elImg.src == HOSTNAME + "/Collections/img/iconRemoveResult.png" ) {
	   processResultMarkingQueue.push( elImg );
       }
  }
  processMarkedResults();
}

function clearResultsCatch() {
  if( ajax.readyState == 4 ) {
      if( ajax.status == 200 ) {
	  doc = ajax.responseXML;
	  window.location( window.location );
      }
  }
}

function emailResult( evt, dmdId ) {
	 alert( "Feature not yet implemented." );
}

function exportResult( evt, dmdId ) {
	 alert( "Feature not yet implemented." );
}

function keywordPageSetup() {
  lc=getDOMObj('leftColumn');
  lcHeight=lc.offsetHeight;
  nCon = getDOMObj( 'content' );
  nConHeight = nCon.offsetHeight;
  nCon.style.width = ( nCon.offsetWidth - 258 ) + "px";
/*  (nConHeight >= lcHeight) ? lc.style.height = nConHeight + "px" : nCon.style.height = lcHeight + "px";*/
  iDiff = ( ( lc.offsetHeight - nCon.offsetHeight ) / 2 );
/*  nCon.style.marginTop = iDiff + "px"; 
*/
  bl = getDOMObj( 'blendLayer' );
/*  bl.style.width = nCon.offsetWidth + "px";
  bl.style.height = nCon.offsetHeight + "px";
  bl.style.marginTop = iDiff + "px";
*/
  bl.style.display="block";
  pB = getDOMObj( 'pageBox' );
  pB.style.height = ( nCon.offsetHeight + 200 ) + "px";
  fe = getDOMObj( 'footer' );
  fe.style.display = "block";

  document.getElementById( "query" ).focus();
}


function mailSavedResults() {
	 alert( "Feature not yet implemented." );
}

function markAllResultsOnPage() {
  /* get all resultItem divs */
  nListDivs = document.getElementsByTagName( "div" );
  var nDivs = new Array();
  iDivs = 0;
  for( i = 0; i < nListDivs.length; i++ ) {
       nDiv = nListDivs[ i ];
       try {
	   if( nDiv.attributes[ "class" ].nodeValue == "resultItem" ) {
		    nDivs[ iDivs ] = nDiv;
		    iDivs++;
	    }
	}
	 catch( e ) { /* no attribute "class" for node, which is fine.  This is shorter than doing another check to see if the attribute exists first. */ }
  }
/* iterate over result Item divs */
  for( i = 0; i < nDivs.length; i++ ) {
       /* find & push img */
       elImg = nDivs[ i ].getElementsByTagName( "p" )[ 0 ].getElementsByTagName( "img" )[ nDivs[ i ].getElementsByTagName( "p" )[ 0 ].getElementsByTagName( "img" ).length -1 ];
       if( elImg.src == HOSTNAME + "/Collections/img/iconSaveResult.png" ) {
	   processResultMarkingQueue.push( elImg );
       }
  }
  processMarkedResults();
}

function markSingleResult( evt, dmdId ) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	processResultMarkingQueue.push( ( evt.target ) ? evt.target : evt.srcElement );
	processMarkedResults();
}

function notImplemented() {
	 alert( "Feature not yet implemented." );
}

function placeBlocks() {
	lc=getDOMObj('leftColumn');
	lcHeight=lc.offsetHeight;
	nCon = getDOMObj( 'content' );
	nConHeight = nCon.offsetHeight;
	nCon.style.width = ( nCon.offsetWidth - 275 ) + "px";
	(nConHeight >= lcHeight) ? lc.style.height = nConHeight + "px" : nCon.style.height = lcHeight + "px";
	fe = getDOMObj( 'footer' );
	fe.style.display = "block";
	bl = getDOMObj( 'blendLayer' );
	bl.style.width = nCon.offsetWidth + "px";
	bl.style.height = nCon.offsetHeight + "px";
	bl.style.display="block";
	pB = getDOMObj( 'pageBox' );
	pB.style.height = ( nCon.offsetHeight + 200 ) + "px";
}

function placeDisplaySegmentBlocks() {
  bd = document.body;
  nCon = getDOMObj( 'content' );
  nCon.style.width = ( nCon.offsetWidth - 275 ) + "px";
  ab = getDOMObj('annotationBox');
  ab.style.width = (bd.offsetWidth - 750) + 'px';
  pb = getDOMObj('playbackBox');
  pb.style.width = (bd.offsetWidth - 300) + 'px';
  pb.style.display = "block";
  sb = getDOMObj('sliderBox');
  sb.style.display = "block";
  vb = getDOMObj('viewerControl');
  vb.style.display = "block";
  pbHeight=pb.offsetHeight;
  lc=getDOMObj('leftColumn');
  lcHeight=lc.offsetHeight;
  baHeight=getDOMObj('banner').offsetHeight;
  fe=getDOMObj('footer');
  newOffset = baHeight;
  (nCon.offsetHeight >= lcHeight) ? newOffset+=pbHeight : newOffset+=lcHeight;
  fe.style.display = "block";
  bl = getDOMObj( 'blendLayer' );
  bl.style.width = nCon.offsetWidth + "px";
  bl.style.height = nCon.offsetHeight + "px";
  bl.style.display="block";
  pB = getDOMObj( 'pageBox' );
  pB.style.height = ( lc.offsetHeight ) + "px";
}

function printSavedResults() {
	 window.print();
}

function processMarkedResults() {
	 if( processResultMarkingQueue.length > 0 ) {
	     savedSearchElement = processResultMarkingQueue.pop();
	     /* find dmdId */
	     dmdId = savedSearchElement.attributes[ "onclick" ].nodeValue.match( "\'(.*?)\'" )[ 1 ];
	     if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		ajax = new XMLHttpRequest();
		if( ajax.overrideMimeType ) {
		    ajax.overrideMimeType( 'text/xml' );
		}
	    }
	    else if (window.ActiveXObject) { // IE
		 try {
		     ajax = new ActiveXObject("Msxml2.XMLHTTP");
		 }
		 catch (e) {
		       try {
			   ajax = new ActiveXObject("Microsoft.XMLHTTP");
		      }
		      catch (e) {}
		  }
	    }
	    ajax.onreadystatechange = processSavedResult;
	    ajax.open( "GET", HOSTNAME + "/Collections/toggleSavedResult.html?dmdId=" + dmdId + "&amp;ieNoCachingKludge=" + new Date().valueOf(), true );
	    ajax.send( "" );
	}
	else {
	     return;
	}
}

function processSavedResult() {
  if( ajax.readyState == 4 ) {
      if( ajax.status == 200 ) {
	  doc = ajax.responseXML;
	  nSaved = doc.getElementsByTagName( "saved" ).item( 0 );
	  if( nSaved.firstChild.nodeValue == "true" ) {
	      savedSearchElement.src = "/Collections/img/iconRemoveResult.png";
	      getDOMObj( "savedCount" ).value++;
	  }
	  else {
	      savedSearchElement.src = "/Collections/img/iconSaveResult.png";
	      getDOMObj( "savedCount" ).value--;
	  }
	  var elImg = false;
	  var nOldText = false;
	  if( getDOMObj( "savedCount" ).value == 1 ) {
	      p = getDOMObj( "savedSearchCount" );
	      for( i=0; i<p.childNodes.length; i++ ) {
		   if( p.childNodes[ i ].nodeName == "IMG" || p.childNodes[ i ].nodeName == "img" ) {
		       elImg = p.childNodes[ i ];
		   }
		   else if( p.childNodes[ i ].nodeName == "#text" && p.childNodes[ i ].nodeValue.indexOf( "v" ) > 0 ) {
			nOldText = p.childNodes[ i ];
		   }
	      }
	      nText = document.createTextNode( " " + getDOMObj( "savedCount" ).value + " result saved" );
	      p.removeChild( nOldText );
	      p.insertBefore( nText, elImg );
	      elImg.src = "/Collections/img/iconRemoveResult.png";
	  }
	  else if( getDOMObj( "savedCount" ).value > 1 ) {
	      p = getDOMObj( "savedSearchCount" );
	      for( i=0; i<p.childNodes.length; i++ ) {
		   if( p.childNodes[ i ].nodeName == "IMG" || p.childNodes[ i ].nodeName == "img" ) {
		       elImg = p.childNodes[ i ];
		   }
		   else if( p.childNodes[ i ].nodeName == "#text" && p.childNodes[ i ].nodeValue.indexOf( "v" ) > 0 ) {
			nOldText = p.childNodes[ i ];
		   }
	      }
	      nText = document.createTextNode( " " + getDOMObj( "savedCount" ).value + " results saved" );
	      p.removeChild( nOldText );
	      p.insertBefore( nText, elImg );
	      elImg.src = "/Collections/img/iconRemoveResult.png";
	  }
	  else {
	      p = getDOMObj( "savedSearchCount" );
	      for( i=0; i<p.childNodes.length; i++ ) {
		   if( p.childNodes[ i ].nodeName == "IMG" || p.childNodes[ i ].nodeName == "img" ) {
		       elImg = p.childNodes[ i ];
		   }
		   else if( p.childNodes[ i ].nodeName == "#text" && p.childNodes[ i ].nodeValue.indexOf( "v" ) > 0 ) {
			nOldText = p.childNodes[ i ];
		   }
	      }
	      nText = document.createTextNode( " No results saved" );
	      p.removeChild( nOldText );
	      p.insertBefore( nText, elImg );
	      elImg.src = "/Collections/img/iconSaveResult.png";
	  }
	  processMarkedResults();
      }
  }
}

function resortResults() {
  nSelect = getDOMObj( "searchCollectionsForm" ).getElementsByTagName( "fieldset" )[ 0 ].getElementsByTagName( "div" )[ getDOMObj( "searchCollectionsForm" ).getElementsByTagName( "fieldset" )[ 0 ].getElementsByTagName( "div" ).length - 1 ].getElementsByTagName( "select" )[ 0 ];
  nSelect.value = getDOMObj( "resortValue" ).value;
  document.searchCollectionsForm.submit();
  return false;
}

function resultsPageSetup() {
  placeBlocks();
  toggleShowResults();
  if( document.getElementById( "query" ) ) {
    document.getElementById( "query" ).focus();
  }
}

function rollup( evt ) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	var elem = ( evt.target ) ? evt.target : evt.srcElement;
	var nUl = elem.parentNode.getElementsByTagName( 'UL')[0];
	nUl.style.display = "none";
	elem.onclick = unroll;
	nText = elem.firstChild;
	nNewText = document.createTextNode('+');
	elem.replaceChild(nNewText, nText );
	return false;
}

function searchCheck() {
/*        var f = document.forms[ 'keywordSearch' ];
	var checkIt = f.searchType[0].checked;
	nTerms = getDOMObj( 'sQuery' );
	terms = nTerms.value;
	thisQuery = '';
	if (checkIt ) {
		q = getDOMObj( 'thisSearchString' ).childNodes[0].nodeValue;
		thisQuery = q + ' ' + terms;
	}
	else {
		thisQuery = terms;
	}
	nTerms.value = thisQuery;
	return;
*/
}

function sendResultsToObjectCollector() {
	 alert( "Feature not implemented yet" );
}

function toggleDetails(evt) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	var elem = ( evt.target ) ? evt.target : evt.srcElement;
	elDes = getDOMObj('descriptionBox');
	elDet = getDOMObj('detailsBox');
	if ( elDes.style.display == 'block' || elDes.style.display == '' ) {
		elDes.style.display = 'none';
		elDet.style.display = 'block';
		elem.value = 'show description';
	}
	else {
		elDes.style.display = 'block';
		elDet.style.display = 'none';
		elem.value = 'show details';
	}
	return false;
}

function toggleLeftColumnBoxes( s ) {
	elem = getDOMObj( 'playbackBox' );
	elWidth = elem.style.width;
	var aBoxes = ['segmentInfoBox', 'cvBox', 'searchBox' ]; //'relatedBox'
	var requestedBox = getDOMObj( s );
	for( i=0; i < aBoxes.length; i++ ) {
		elemCheck = getDOMObj( aBoxes[i] );
		if ( elemCheck == requestedBox ) {
			elemCheck.getElementsByTagName( "div" )[0].style.display = "block";
		}
		else {
			elemCheck.getElementsByTagName( "div" )[0].style.display = "none";
		}
		if(requestedBox.id == 'collectionBox') {
			window.location.hash = 'activeSegment';
			elem.style.width = elWidth;
		}
	}
	placeFooter();
}

function toggleSearchHierarchyDisplay( evt ) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	var elem = ( evt.target ) ? evt.target : evt.srcElement;
	var nSpan = "";
	if( elem.childNodes.length > 1 ) {
	  nSpan = elem.childNodes[0];
	}
	else {
	  nSpan = elem;
	}
	if( nSpan.childNodes[0].nodeValue == "[+]" ) {
	  nSpan.childNodes[0].nodeValue = "[-]";
	}
	else {
	  nSpan.childNodes[0].nodeValue = "[+]";
	}
	elem = nSpan.parentNode.parentNode;
	divList = elem.childNodes;
	for( i = 0; i < divList.length; i++ ) {
	  if( divList[i].nodeName == "DIV" ) {
	    if( divList[i].style.display == "none" || divList[i].style.display == "" ) {
	      divList[i].style.display = "block";
	    }
	    else {
	      divList[i].style.display = "none";
	    }
	  }
	}
      nCon = getDOMObj( "content" );
      bl = getDOMObj( "blendLayer" );
      pB = getDOMObj( "pageBox" );
      lc = getDOMObj( "leftColumn" );
      divList = nCon.childNodes;
      newHeight = 47;
      for( i = 0; i < divList.length; i++ ) {
	if( divList[i].nodeName == "DIV" ) {
	  newHeight += divList[i].offsetHeight;
	}
      }
      if( newHeight > lc.offsetHeight ) {
	nCon.style.height = newHeight + "px";
	bl.style.height = newHeight + "px";
	pB.style.height = newHeight + 150 + "px";
      }
      else {
	nCon.style.height = lc.offsetHeight + "px";
	bl.style.height = lc.offsetHeight + "px";
	pB.style.height = lc.offsetHeight + 150 + "px";
      }
}
/*
function toggleSaved( evt, dmdId ) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	savedSearchElement = ( evt.target ) ? evt.target : evt.srcElement;
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	    ajax = new XMLHttpRequest();
	    if( ajax.overrideMimeType ) {
		ajax.overrideMimeType( 'text/xml' );
	    }
	}
	else if (window.ActiveXObject) { // IE
	    try {
		ajax = new ActiveXObject("Msxml2.XMLHTTP");
	    }
	    catch (e) {
		try {
		    ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e) {}
	    }
	}
	ajax.onreadystatechange = processSavedResult;
	ajax.open( "GET", HOSTNAME + "/Collections/toggleSavedResult.html?dmdId=" + dmdId + "&amp;ieNoCachingKludge=" + new Date().valueOf(), true );
	ajax.send( "" );
}
*/
function toggleShowResults( evt ) {
    if( evt ) {
	 elem = getDOMObj( "showResultsBox" );
	 if( elem.parentNode.childNodes[1].childNodes[2].value == "relevance" ) {
	     elem.style.display = "block";
	 }
	 else {
	     elem.style.display = "none";
	 }
    }
}

function unroll( evt ) {
	evt = (evt) ? evt : (window.event) ? window.event : "";
	var elem = ( evt.target ) ? evt.target : evt.srcElement;
	var nUl = elem.parentNode.getElementsByTagName('UL')[0];
	nUl.style.display = "block";
	elem.onclick = rollup;
	nText = elem.firstChild;
	nNewText = document.createTextNode('-');
	elem.replaceChild(nNewText, nText );
	return false;
}

function updateQuery() {
	nLabel0 = getDOMObj( "qLabel0" );
	nLabel1 = getDOMObj( "qLabel1" );
	nLabel2 = getDOMObj( "qLabel2" );
	nToken0 = getDOMObj( "qToken0" );
	nToken1 = getDOMObj( "qToken1" );
	nToken2 = getDOMObj( "qToken2" );
	nConnector1 = getDOMObj( "qConnector1" );
	nConnector2 = getDOMObj( "qConnector2" );
	sQuery = "";
	if( nToken0.value.length > 0 ) {
		if ( nLabel0.value.length > 0 ) {
			sQuery += nLabel0.value;
		}
		sQuery += nToken0.value;
		if ( nToken1.value.length > 0 ) {
			sQuery += " " + nConnector1.value + " ";
			if ( nLabel1.value.length > 0 ) {
				sQuery += nLabel1.value;
			}
			sQuery += nToken1.value;
			if ( nToken2.value.length > 0 ) {
				sQuery += " " + nConnector2.value + " ";
				if ( nLabel2.value.length > 0 ) {
					sQuery += nLabel2.value;
				}
				sQuery += nToken2.value;
			}
		}
	}
	getDOMObj( "query" ).value = sQuery;
}

function widthTest() {
	elem = document.getElementById( 'playbackBox' );
	alert( elem.style.width );
}



