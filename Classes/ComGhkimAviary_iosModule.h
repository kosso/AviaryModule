/**
 * Your Copyright Here
 *
 * Appcelerator Titanium is Copyright (c) 2009-2010 by Appcelerator, Inc.
 * and licensed under the Apache Public License (version 2)
 */
#import "TiModule.h"
#import "AFPhotoEditorController.h"

@interface ComGhkimAviary_iosModule : TiModule <AFPhotoEditorControllerDelegate,UINavigationControllerDelegate, UIImagePickerControllerDelegate>
{
    AFPhotoEditorController *editorController;
    AFPhotoEditorStyle *style;
}

@end
