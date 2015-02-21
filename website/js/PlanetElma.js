
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

function PlanetElma(loader) {

    this.loader = loader;
	this.selectedMenu=0;
	//this.selection = [];
	this.selectionList = new SelectionList();
	this.subMenuList = new SelectionList();
	
	this.imageUrl='/images/testcontent/';
	this.configUrl='/config/';
}


PlanetElma.prototype.LoadImages = function () {
    var that =this;
    
// 	$.getJSON( "/imagebyparentid?pid=0", function( data ) {
// 	   that.displayImages(data);		 
// 	});

    $.getJSON( "/config/images.js", function( data ) {

        var idx =0;
        var parents = [];
        
        while(idx < data.length){
            if(data[idx].parentCId ==0){
                parents.push(data[idx]);
            }
            idx++;
        }

        data = parents;

        that.displayImages(data);	
         
    });


	$('body').on("click", ".frame", $.proxy(function (e) { 
        var id = e.target.attributes['data-id'].value;
        
        this.SelectImage(id); 
        return false; 
    }, this));
};


PlanetElma.prototype.displayImages = function (data) {
    var that =this;
    var idx = 0;
    var newInner = "";
    
    $.each( data, function( key, val ) {		
			newInner+= '<div style="display: inline"><a id ="image'+ key + '" href="" class ="frame"><img id ="i'+ key +'"  data-id = "'+ val.cId +'" src="'+ that.imageUrl+val.imageName + '"></a>';			
	});
	  
    $('#gallery-container').html(newInner);
};



PlanetElma.prototype.SelectImage = function (id) {
// get selection id
  //  alert('img selected' + id);
    
    var that = this;

    //$.getJSON( "/imagebyparentid?pid="+id, function( data ) {
    $.getJSON( "/config/images.js", function( data ) {

        var idx =0;
        var parents = [];
        
        while(idx < data.length){
            if(data[idx].parentCId ==id){
                parents.push(data[idx]);
            }
            idx++;
        }

        data = parents;

        that.displayImages(data);	
        
        that.LoadMenus(1);	
    });
    
    // get child images from parentid
};


PlanetElma.prototype.LoadMenus = function (parentId) { 
	var that = this;
	
    if(parentId == undefined )
    {
        parentId =0;
        
        $.getJSON( "/config/menus.js", function( data ) {
            
            var idx =0;
            var parents = [];
            
            while(idx < data.length){
                if(data[idx].parentMenuId ==parentId){
                    parents.push(data[idx]);
                }
                idx++;
            }
            
            data = parents;
            
            that.selectionList.populateList(data, that.SelectMenu, that, 'menu-container');
        });
    }
 
  //  else
  //  {
  //      $.getJSON( "/menusByParentId?pid="+parentId, function( data ) {
  //          that.selectionList.populateList(data, that.SelectMenu, that,'menu-container');
  //      });
  //  }
    
    
};

PlanetElma.prototype.SelectMenu = function (evt) {
    
    // menu is clicked we end up here with selected menu ids
    
    //evt is NOW selection
    
	//this.selectionList.selection;
    var that = this;
    console.log('select menu:'+evt);
  //  $.getJSON( "/menusByParentId?pid="+evt, function( data ) {
  //      if(data.length >0)
  //          that.subMenuList.populateList(data, that.SelectMenu, that,'sub-menu-container');
  //  });
  
    
    //var that = this;

    
    
    // $.getJSON( "/imagebymenuid?mid="+evt, function( data ) {

    //     that.displayImages(data);	
        
    // });
    
     $.getJSON( "/config/images.js", function( data ) {

        var idx =0;
        var parents = [];
        
        while(idx < data.length){
            if(data[idx].menuId ==evt){
                parents.push(data[idx]);
            }
            idx++;
        }

        data = parents;

        that.displayImages(data);	
         
    });
    
   // if(evt == 4)
   // {
   //       that.LoadMenus();	
    //    that.LoadImages();
   // }
    
};