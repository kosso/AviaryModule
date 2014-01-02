/*

IMPORTANT STUFF!

NB: Don't forget to add the AviarySDKResources.bundle file to your Resources folder.

ALSO: Don't forget to add your Avairy API Key to your tiapp.xml in the <ios> section: 

eg: 
    <ios>
        <min-ios-ver>5.0</min-ios-ver>
        <plist>
            <dict>
                <key>Aviary-API-Key</key>
                <string>12345YourAPIkey123456</string>
            </dict>
        </plist>
    </ios>

*/



var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var mainView = Ti.UI.createView({ backgroundColor:'#eee', height: 320, top:20, width: 320 });
var iv = Titanium.UI.createImageView({ top:0, width: 320});

var aviary = require('com.ghkim.aviary_ios');
var tools = ['kAFEffects', 'kAFOrientation', 'kAFBrightness', 'kAFContrast', 'kAFSharpness'];

var media_file = null;

var startbutton = Ti.UI.createButton({  title: 'Select Photo...', bottom: 10, left: 10 });
var filterbutton = Ti.UI.createButton({  title: 'Filter...', bottom: 10, right: 10 });


function openAviaryFilters() {

        aviary.newImageEditor(media_file, tools);
        aviary.displayEditor();
	
}

function selectPhoto() {

    Titanium.Media.openPhotoGallery({

    success:function(event)
    {

        var cropRect = event.cropRect;
        image = event.media;//blob object

        media_file = image;

        // set image view
        if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
        {
            
            if(cropRect) {
                
                imgStr=Ti.Utils.base64encode(image);// doesn't work because 'image' has to be a string!, but how?
                img_src = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'image.jpg');
                var img_src_height = Math.round(cropRect.height / (cropRect.width / 320));
                
                if(Ti.Platform.osname == 'android') {
                    
                    img = image;
                    
                } else {
                    img_src.write(image.imageAsResized(320, img_src_height));
                    var image = Titanium.UI.createImageView({image:img_src.nativePath, width: 320 });
                    img = image.toImage();
                }
    	    
                
            } else {
                img = image;
            }
            
            //iv.backgroundImage = img;
            iv.image = img;
            mainView.add(iv);

           filterbutton.enabled = true;

            
        }
        else
        {

        }
    },
    allowEditing:true, // will return a square image
    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
    });

}

aviary.addEventListener('avEditorFinished', function(ev){
        iv.image = ev.image;
        // media_file is the final image blob.
        media_file = ev.image;
    });


win.add(mainView);

win.add(startbutton);
win.add(filterbutton);

filterbutton.enabled = false;


startbutton.addEventListener('click',function(e) {
   selectPhoto();
});

filterbutton.addEventListener('click',function() {
	openAviaryFilters();	
});

win.open();


