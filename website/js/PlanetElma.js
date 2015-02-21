var DataManager, SelectionList;



function PlanetElma(loader) {

    this.dataManager = new DataManager();

	this.selectedMenu=0;
	//this.selection = [];
	this.selectionList = new SelectionList();
	this.subMenuList = new SelectionList();
	
}


PlanetElma.prototype.LoadImages = function () {
    var that =this;

    this.dataManager.GetImagesByParentId(0, function(data){
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
   
    var newInner = "";
    
    $.each( data, function( key, val ) {		
			newInner+= '<div style="display: inline"><a id ="image'+ key + '" href="" class ="frame"><img id ="i'+ key +'"  data-id = "'+ val.cId +'" src="'+ that.imageUrl+val.imageName + '"></a>';			
	});
	  
    $('#gallery-container').html(newInner);
};



PlanetElma.prototype.SelectImage = function (id) {

    var that = this;

    this.dataManager.GetImagesByParentId(id, function(data){
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
        
        this.dataManager.GetMenusByParentId(parentId, function(data){
            that.selectionList.populateList(data, that.SelectMenu, that, 'menu-container');
        });
    }
     

};

PlanetElma.prototype.SelectMenu = function (evt) {

    var that = this;
    console.log('select menu:'+evt);

    this.dataManager.GetImagesByMenuId(evt, function(data){
        that.displayImages(data);
    });
     
};