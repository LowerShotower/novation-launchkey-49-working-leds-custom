gridPage = new Page();
gridPage.previousTempMode = TempMode.OFF;
gridPage.canScrollTracksUp = false;
gridPage.canScrollTracksDown = false;
gridPage.canScrollScenesUp = false;
gridPage.canScrollScenesDown = false;
gridPage.title = "Clip Launcher";

// Updates the scroll buttons
gridPage.updateOutputState = function()
{
   clear();
   this.canScrollUp = this.canScrollScenesUp;
   this.canScrollDown =this.canScrollScenesDown;
   this.canScrollLeft =this.canScrollTracksUp;
   this.canScrollRight =this.canScrollTracksDown;
    
   this.updateScrollButtons();
   this.updateGrid();
};

gridPage.setPreviousTempMode = function (prevTM) {
    gridPage.previousTempMode = prevTM;
}

//stop/plaay/loop etc section, incontrol section, fader buttons section-------------------------------------------------
gridPage.onOtherButton = function(buttonId, isPressed)
{
	//MASTER LOOP PLAY  STOP button's actions
	switch (buttonId) 
	{
		case OtherButton.MASTER:
			if (isPressed)
			{
                switchMasterLED(IS_MASTER_TOGGLED);
 			}
 		break;

 		case OtherButton.LOOP:
 			IS_LOOP_PRESSED = isPressed;
 		break;

 		case OtherButton.RECORD:
 			if (!IS_LOOP_PRESSED)
 			{
	 			if (isPressed)
	 			{
		 			transport.setClick(!WRITEOVR);
		            transport.toggleLauncherOverdub();
	            }
	        }
	        else 
	        {
	        if (isPressed)
	 			{
		 			transport.record();
	            }
	        }
 		break;

 		case OtherButton.PLAY:
 			if (isPressed){transport.play();}
 		break;

 		case OtherButton.STOP:
 			if (isPressed){transport.stop();transport.setClick(false);}
 		break;
 	}


 	//FADERS Button actions in inControl Mode
	if (IS_MASTER_TOGGLED) 
	{
 		switch (buttonId)
 		{
	 		case OtherButton.FB1:
                if (isPressed)
                {
                    this.setTempMode(TempMode.CUT);
                    host.showPopupNotification("PADS: CUT");
                }
                else
                {
                    this.setTempMode(TempMode.OFF);
                    host.showPopupNotification("PADS: MIX");
                }
	 		break;

	 		case OtherButton.FB2:
                if (isPressed)
                {
                    this.setTempMode(TempMode.COPY);
                    host.showPopupNotification("PADS: COPY");
                }
                else
                {
                    this.setTempMode(TempMode.OFF);
                    host.showPopupNotification("PADS: MIX");
                }
	 		break;

	 		case OtherButton.FB3:
	 			//if (isPressed) {application.previousPanelLayout();}
                if (isPressed)
                {
                    application.createInstrumentTrack(-1);

                }
                else
                {
                    switchMasterLED(true);
                }

	 		break;

	 		case OtherButton.FB4:
                if (isPressed) {
                    if (TEMPMODE != TempMode.COLOR_RGB) {
                        isRGBOn = true;
                        this.setTempMode(TempMode.COLOR_RGB);
                        host.showPopupNotification("COLOR: RGB");
                        this.setPreviousTempMode(TempMode.COLOR_RGB);
                    }
                    else {
                        isRGBOn = false;
                        this.setTempMode(TempMode.OFF);
                        host.showPopupNotification("COLOR: SIMPLE");
                        this.setPreviousTempMode(TempMode.OFF);
                    }
                }
                else
                {
                    switchMasterLED(true);
                }
            break;

	 		case OtherButton.FB5:
	 			if (isPressed) 
	 			{

	 			}
	 			else 
	 			{

	 			}
	 		break;

	 		case OtherButton.FB6:
	 			if (isPressed)
	 			{
                    cursorClip.quantize(1);
                    host.showPopupNotification("QUANTIZED");
	 			}
	 			else
	 			{

	 			}
	 		break;

	 		case OtherButton.FB7:
	 			if (isPressed) {application.undo();
	 			host.showPopupNotification("UNDO");
	 			}
	 		break;

	 		case OtherButton.FB8:
	 			if (isPressed) {application.redo();
	 			host.showPopupNotification("REDO");
	 			}
	 		break;
 		}
	}
	else if (!IS_MASTER_TOGGLED) 
	{
		switch (buttonId) 
		{
	 		case OtherButton.FB1:
                if (isPressed)
                {
                    if (TEMPMODE != TempMode.DEVICE)
                    {
                        this.setTempMode(TempMode.DEVICE);
                        host.showPopupNotification("PADS: DEVICE");
                        this.setPreviousTempMode(TempMode.DEVICE);
                    }
                    else
                    {
                        this.setTempMode(TempMode.OFF);
                        host.showPopupNotification("PADS: MIX");
                        mixerButtonToggle = false;
                        this.setPreviousTempMode(TempMode.OFF);
                    }
                }
	 		break;

	 		case OtherButton.FB2:

                if (isPressed)
               {

                   if (TEMPMODE != TempMode.SEND)
                   {
                       this.setTempMode(TempMode.SEND);
                       host.showPopupNotification("PADS: SEND");
                       this.setPreviousTempMode(TempMode.SEND);
                   }
                   else
                   {
                       this.setTempMode(TempMode.OFF);
                       host.showPopupNotification("PADS:MIX");
                       this.setPreviousTempMode(TempMode.OFF);
                   }


                   /*  if (TEMPMODE != TempMode.EDIT)
                   {
                       this.setTempMode(TempMode.EDIT);
                       host.showPopupNotification("EDIT");
                       mixerButtonToggle = true;
                       contentTypeIndex = 0;
                   }
                   else
                   {
                       this.setTempMode(TempMode.OFF);
                       host.showPopupNotification("SESSION");
                       mixerButtonToggle = false;
                   }
                   */
               }

	 		break;

	 		case OtherButton.FB3:


	 		break;

	 		case OtherButton.FB4:
                if (isPressed)
                {
                    this.switchLayoutOrPanel(IS_LOOP_PRESSED);
                }
	 		break;
	 		case OtherButton.FB5:

                if (isPressed)
                {
                    this.setTempMode(TempMode.SOLO);
                    host.showPopupNotification("PADS: SOLO");
                }
                else
                {
                    this.setTempMode(this.previousTempMode);
                    host.showPopupNotification("PADS: MIX");
                    /*for (var t=0; t<numTracks; t++) {trackBankAll.getChannel(t).getSolo().set(false);}*/
                }
	 			break;
	 		case OtherButton.FB6:
                if (isPressed)
                {
                    this.setTempMode(TempMode.MUTE);
                    host.showPopupNotification("PADS: MUTE");
                }
                else
                {
                    this.setTempMode(this.previousTempMode);
                    host.showPopupNotification("PADS: MIX");
                }
                break;
	 		case OtherButton.FB7:
                if (isPressed)
                {
                    this.setTempMode(TempMode.ARM);
                    host.showPopupNotification("PADS: ARM");
                }
                else
                {
                    this.setTempMode(this.previousTempMode);
                    host.showPopupNotification("PADS: MIX");
                }
				break;
	 		case OtherButton.FB8:
                if (isPressed)
                {
                    this.setTempMode(TempMode.SELECT);
                    host.showPopupNotification("PADS: SELECT TRACK");
                }
                else
                {
                    this.setTempMode(this.previousTempMode);
                    host.showPopupNotification("PADS: MIX");
                }
                break;
	 	}
	}


 	//INCONTROL Button actions
	switch (buttonId)
	{
 		case 13:
 		incontrol_knobs = isPressed;
        break;

        case 14:
        incontrol_mix = isPressed;

       	break;

   		case 15:
   			if (isPressed) {
   			    resetGrid();
	   			this.setTempMode(this.previousTempMode);
	   			host.showPopupNotification("PADS: MIX");
	   			//incontrol_pads = true;
   			}
   			else {
	   			//this.setTempMode(TempMode.PADSOFF);
	   			host.showPopupNotification("PADS: DRUMS");
	   			//incontrol_pads = false;
   			}
        break;

        case 16:
        break;
    }
}




// used to insert code in makescrollpot function instead func2----------------------------------------------------------
gridPage.scrollToNext = function (knInd) {

	switch (knInd) {
		case 1:
            popupBrowser.selectedContentTypeIndex().set(++contentTypeIndex);
            if (contentTypeIndex>=7){
                contentTypeIndex -= 1;
            } else if(contentTypeIndex<0){
                contentTypeIndex +=1;
            }
			break;

        case 2:
            deviceTypeCursorItem.moveToNext();
            deviceTypeCursorItem.isSelected().set(true);
            break;
        case 3:
            locationCursorItem.moveToNext();
            locationCursorItem.isSelected().set(true);
            break;
        case 4:
            deviceCursorItem.moveToNext();
            deviceCursorItem.isSelected().set(true);
            break;

        case 5:
            categoryCursorItem.moveToNext();
            categoryCursorItem.isSelected().set(true);
            break;
        case 6:
            tagCursorItem.moveToNext();
            tagCursorItem.isSelected().set(true);
            break;
        case 7:
            popupBrowser.selectNextFile();
            break;
	}
};




// used to insert code in makescrollpot function instead func1----------------------------------------------------------
gridPage.scrollToPrevious = function (knInd) {
    switch (knInd) {
        case 1:
            popupBrowser.selectedContentTypeIndex().set(--contentTypeIndex);
            if (contentTypeIndex>=7){
                contentTypeIndex -= 1;
            } else if(contentTypeIndex<0){
                contentTypeIndex +=1;
            }
            break;

        case 2:
            deviceTypeCursorItem.moveToPrevious();
            deviceTypeCursorItem.isSelected().set(true);
            break;
        case 3:
            locationCursorItem.moveToPrevious();
            locationCursorItem.isSelected().set(true);
            break;

        case 4:
            deviceCursorItem.moveToPrevious();
            deviceCursorItem.isSelected().set(true);
            break;

        case 5:
            categoryCursorItem.moveToPrevious();
            categoryCursorItem.isSelected().set(true);
            break;
        case 6:
            tagCursorItem.moveToPrevious();
            tagCursorItem.isSelected().set(true);
            break;
    	case 7:
            popupBrowser.selectPreviousFile();
            break;
    }
};




//function for making scrollPot function
gridPage.makeScrollPot = function () {
    var prevData;
    var d;
    var dif;
    var div;
    return function (knob, data2, steps, resolution, func2, func1) {

        ////println(prevData);
        if (prevData === undefined) {
            prevData = data2;
        }

         dif = data2 -prevData;

         div = resolution/steps;

        if (div>=1){div = Math.floor(div);}

        if (dif >=  div) {
            func2(knob);
            prevData = data2;
            d = div;
            for ( ; d < 1; ) {
                func2(knob);
                d += div
			}
        } else if (dif<= -div) {
            func1(knob);
            prevData = data2;
            d = div;
            for ( ; d < 1; ) {
                func1(knob);
                d += div
            }
        }
	};
};

gridPage.scrollPot = gridPage.makeScrollPot();





//knobs actions --------------------------------------------------------------------------------------------------------
gridPage.onPots = function (inControl, data1, data2)
{
    var diff;
    var knobIndex = data1 - 21;
	if (TEMPMODE == TempMode.EDIT || ( TEMPMODE == TempMode.DEVICE && isPopup) )
	{
		gridPage.scrollPot(knobIndex, data2, entryCount[knobIndex], 127,
							gridPage.scrollToNext, gridPage.scrollToPrevious );
		/*//println("deviceType "+ entryCount['2']);
		//println("location "+ entryCount['3']);
        //println("device "+ entryCount['4']);
        //println("category  "+ entryCount['5']);
        //println("tag "+ entryCount['6']);
        //println("results  "+ entryCount['7']);*/
	}

	else if (TEMPMODE == TempMode.SEND)
    {
        if(knobIndex<NUM_SENDS)
        {
            diff = data2-sends[sendBankIndex*8 + knobIndex];


            if (diff < trashhold && diff > -trashhold)
            {
                trackBank.getChannel(sendBankIndex).sendBank().getItemAt(knobIndex).set(data2,128);

                return;
            }
            else if (isScalingMode)
            {
                if(diff>0)
                {
                    trackBank.getChannel(sendBankIndex).sendBank().getItemAt(knobIndex).inc(scalingSpeedInSteps, 128);
                }
                else if(diff<0)
                {
                    trackBank.getChannel(sendBankIndex).sendBank().getItemAt(knobIndex).inc(-scalingSpeedInSteps, 128);
                }
            }
        }
    }

	else {
		if(inControl == false)
		{
			if (knobIndex >= 0 && knobIndex < 8)
			{
				//??????????????????userControls_0.getControl(knobIndex).set(data2, 128);
			}
		}
		else if (inControl == true)
		{
			if (knobIndex >= 0 && knobIndex < 8)
			{
                diff = (data2-cursorRCParameters[knobIndex]);

                if (knobs[knobIndex].isCaptured)
                {
                    cursorRCPage.getParameter(knobIndex).set(data2,128);
                    return;
                }
                if (diff< trashhold && diff > -trashhold)
                {
                    cursorRCPage.getParameter(knobIndex).set(data2,128);
                    knobs[knobIndex].isCaptured = true;
                }
                else if (isScalingMode)
                {
                    if(diff>0)
                    {
                        cursorRCPage.getParameter(knobIndex).inc(scalingSpeedInSteps, 128);
                    }
                    else if(diff<0)
                    {
                        cursorRCPage.getParameter(knobIndex).inc(-scalingSpeedInSteps, 128);
                    }
                }
			}
		}
	}

}

//faders actions (and fader buttons as they are in !incontrol mode i.e while incontrol slider button off----------------
gridPage.onFaders = function (inControl, data1, data2)
{

    if(inControl == true)
    {
        var diff;
        if (data1 >= 41 && data1 <= 48)
        {
            var sliderIndex = data1 - 41;

            diff = (data2-volumes[sliderIndex]);


            if (diff< trashhold && diff > -trashhold)
            {
                trackBank.getChannel(sliderIndex).getVolume().set(data2, 128);

            }
            else if (isScalingMode)
            {
                if(diff>0)
                {
                    trackBank.getChannel(sliderIndex).getVolume().inc(scalingSpeedInSteps, 128);
                }
                else if(diff<0)
                {
                    trackBank.getChannel(sliderIndex).getVolume().inc(scalingSpeedInSteps, 128);
                }
            }















        }
        else if (data1 == 7)
        {
            masterTrack.getVolume().set(data2, 128);
        }

	}
    else if (inControl == false)
    {
       if (data1 >= 41 && data1 <= 48)
        {
            var sliderIndex = data1 - 41;

        }
        else if (data1 == 7)
        {
            //cursorTrack.getVolume().set(data2, 128);
            masterTrack.getVolume().set(data2, 128);
        }
       else if (data1 >= 51 && data1 <= 58)
       {
           var buttonIndex = data1 - 51;

           if (data2 == 127)
           {
               trackBank.getChannel(buttonIndex).select();
               host.getMidiOutPort(1).sendMidi(159, 14,127);
               incontrol_mix = true;

           }
       }
	}
}





// This detects when one of the round right scene buttons is pressed and changes the TempMode --------------------------
gridPage.onSceneButton = function(row, isPressed)
{
	//RBs actions
	if(TEMPMODE == TempMode.OFF || TEMPMODE == TempMode.COLOR_RGB)
	{
      switch(row)
      {   
        case MixerButton.FIRSTROW:
        case MixerButton.SECONDROW:
        	if (isPressed) 
        	{
	        	if (!isAllInRow[row])
	            {
	            	if (!IS_LOOP_PRESSED)
            		{
	            		trackBank.launchScene(row);
            		}
            		else if (IS_LOOP_PRESSED) 
            		{
	            		for (var t=0; t<numTracks; t++) 
            			{
		            		if (hasContentAll[row*NUM_TRACKS_ALL + t]>0) 
				    		{
				    			if (isPlayingAll[row*NUM_TRACKS_ALL + t]>0)
				    			{
				    				trackBankAll.getChannel(t).getClipLauncherSlots().stop();
				    			} 
				    		}
			    		}
            		}
	            }
	            else if (isAllInRow[row]) 
	            {
            		if (!IS_LOOP_PRESSED)
            		{
	            		for (var t=0; t<numTracks; t++)
	            		{
		            		trackBankAll.getChannel(t).getClipLauncherSlots().stop();
	            		}
            		}
            		else if (IS_LOOP_PRESSED) 
            		{
            			for (var t=0; t<numTracks; t++) 
            			{
		            		if (hasContentAll[row*NUM_TRACKS_ALL + t]>0) 
				    		{
				    			if (isPlayingAll[row*NUM_TRACKS_ALL + t]>0)
				    			{
				    				trackBankAll.getChannel(t).getClipLauncherSlots().stop();
				    			} 
				    		}
			    		}
		    		}
		    		transport.setClick(false);
		            transport.setLauncherOverdub(false);
	            }
        	}
         break;
      }	
   }

    //RBs actions
   else if (TEMPMODE == TempMode.DEVICE && !isPopup )
   {
		if (isPressed)
		{

		   if (row == 0) {

		   	if(IS_LOOP_PRESSED) {
		   		cursorDevice.browseToInsertAfterDevice();
			} else {
		   		if (numDevices == 0) cursorTrack.browseToInsertAtEndOfChain();
		   		if (numDevices>0) cursorDevice.browseToReplaceDevice();
                host.showPopupNotification(numDevices);

		   	}


		   }
		   else if (row == 1) {
		   	cursorTrack.selectInEditor();
               application.remove();
		   }
   		}
   }

    //RBs actions
    else if (TEMPMODE == TempMode.EDIT || (TEMPMODE == TempMode.DEVICE && isPopup) )
    {
        switch(row)
        {
            case MixerButton.FIRSTROW:
                if (isPressed)
                {
                	if(isPopup)
                	{
                        popupBrowser.cancel();
                    } else
					{
                        cursorTrack.browseToInsertAtEndOfChain();
					}
                }

            	break;
            case MixerButton.SECONDROW:
                if (isPressed)
                {
					popupBrowser.commit();
				}
				break;
        }
    }

    //RBs actions
    else if (TEMPMODE == TempMode.CUT)
    {
    }

    //RBs actions
    else if (TEMPMODE == TempMode.COPY)
    {
    }
};





// These following 4 functions control the scrolling arrow buttons allowing move around---------------------------------
gridPage.onLeft = function(isPressed)
{
	//LEFT action
   if (isPressed)
   {
   		if(indexToStart > 0) {	indexToStart--; }

        trackBank.scrollChannelsUp();

   }
};

gridPage.onRight = function(isPressed)
{
	//RIGHT action
   if (isPressed)
   {
   		if( indexToStart < (numTracks-NUM_TRACKS) ) { indexToStart++; }

        trackBank.scrollChannelsDown();
   }
};

gridPage.onUp = function(isPressed)
{
	//UP action
   if (isPressed)
   {
      trackBank.sceneBank().scrollUp(); trackBankAll.sceneBank().scrollUp();
   }
};

gridPage.onDown = function(isPressed)
{
	//DOWN action
   if (isPressed)
   {
      trackBank.sceneBank().scrollDown(); trackBankAll.sceneBank().scrollDown();
   }
};





// all what can occur while grid buttons are pressed ------------------------------------------------------------------
gridPage.onGridButton = function(row, column, isPressed)
{
	var padNo = column + row*8;

	//GRID Buttons actions
   if (TEMPMODE === TempMode.OFF || TEMPMODE == TempMode.COLOR_RGB)
   {
      var track = column ;
      var scene = row ;
      var i = track + scene*8;
      var t = trackBank.getChannel(track);
      var l = t.getClipLauncher();

      l.select(scene);

      if(!IS_LOOP_PRESSED && isPressed){
	      if (/*IS_RECORD_PRESSED*/ hasContent[track+8*scene] == 0)
	      {
	      	if(arm[track]){
	      		transport.setClick(true);
	      		l.record(scene);
			    l.launch(scene);
	      	}
		    else {
			    t.select();
		    }
	      }
	      else
	      {
			  if (!WRITEOVR) {transport.setClick(false);}
			  if (isPlaying[i]>0)
			  {
				  l.stop();
				  transport.setClick(false);
				  transport.setLauncherOverdub(false);
			  }
			  else {
				  l.launch(scene);
			  }
	      }
      }
	  else if (IS_LOOP_PRESSED && isPressed)
		{

			if (hasContent[track+8*scene] == 0)
			{
				if(arm[track])
				{
					//t.getArm().toggle();
				}
				//t.selectInEditor();
				l.createEmptyClip(scene,4*(Math.pow(2,2)));
			}
			else
			{
				if (isPlaying[i]>0)
				{
					//l.stop();
					//transport.setClick(false);
					//transport.setLauncherOverdub(false);
                    l.select(scene);
                    l.deleteClip(scene);
				}
				else
				{
					l.select(scene);
					l.deleteClip(scene);
				}
			}
		}
   }

   //GRID Buttons actions
   else if (TEMPMODE === TempMode.DEVICE && !isPopup) {
       if (isPressed)
       {
           if (padNo >= 0 && padNo < 8)
           {
              cursorRCPage.selectedPageIndex().set(padNo);

           }
           else if (padNo >= 8 && padNo < 16)
           {
               var padInRow = padNo-8;
               cursorDevice.selectDevice(deviceBank.getDevice(padInRow));

               cursorDevice.isRemoteControlsSectionVisible().set(true);
               deviceBank.scrollUp();
           }
       }
   }

   //GRID Buttons actions EDIT mode
   else if (TEMPMODE === TempMode.EDIT || (TEMPMODE === TempMode.DEVICE && isPopup)  )
   {
   		if (isPressed)
   		{

	   		switch (padNo) 
	   		{
	   			case 0:
					//trackBank.getChannel(column).select();
                    cursorTrack.select();
                    application.remove();
                    host.showPopupNotification("remove");
	   				break;
	   			case 1:
                    popupBrowser.selectedContentTypeIndex().set(--contentTypeIndex);
                    if (contentTypeIndex>=7){
                        contentTypeIndex -= 1;
                    } else if(contentTypeIndex<0){
                        contentTypeIndex +=1;
                    }
                    break;
	   			case 2:
                    deviceTypeCursorItem.moveToPrevious();
                    deviceTypeCursorItem.isSelected().set(true);
	   				break;
	   			case 3:
                    locationCursorItem.moveToPrevious();
                    locationCursorItem.isSelected().set(true);
	   				break;
	   			case 4:
                    deviceCursorItem.moveToPrevious();
                    deviceCursorItem.isSelected().set(true);
	   				break;
	   			case 5:
                    categoryCursorItem.moveToPrevious();
                    categoryCursorItem.isSelected().set(true);
	   				break;
	   			case 6:
                    tagCursorItem.moveToPrevious();
                    tagCursorItem.isSelected().set(true);
	   				break;
	   			case 7:
					popupBrowser.selectPreviousFile();
	   				break;
	   			case 8:
                    application.createInstrumentTrack(-1);
	   				break;
	   			case 9:
                    popupBrowser.selectedContentTypeIndex().set(++contentTypeIndex);
                    if (contentTypeIndex>=7){
                        contentTypeIndex -= 1;
                    } else if(contentTypeIndex<0){
                        contentTypeIndex +=1;
                    }
	   				break;
	   			case 10:
                    deviceTypeCursorItem.moveToNext();
                    deviceTypeCursorItem.isSelected().set(true);
	   				break;
	   			case 11:
                    locationCursorItem.moveToNext();
                    locationCursorItem.isSelected().set(true);
	   				break;
	   			case 12:
                    deviceCursorItem.moveToNext();
                    deviceCursorItem.isSelected().set(true);
	   				break;
	   			case 13:
                    categoryCursorItem.moveToNext();
                    categoryCursorItem.isSelected().set(true);
	   				break;
	   			case 14:
                    tagCursorItem.moveToNext();
                    tagCursorItem.isSelected().set(true);
	   				break;
	   			case 15:
                    popupBrowser.selectNextFile();
	   				break;
	   		}
   		}
   }

   else if (TEMPMODE === TempMode.SEND)
   {
       if (isPressed) {
           if (column < numTracks) {
                sendBankIndex = column;
           }
       }
   }


   // Grid action SOLO mode
   else if (TEMPMODE === TempMode.SOLO)
   {
   if (isPressed)
   {
      switch(row)
	  {
		 case 1:
			trackBank.getChannel(column).getSolo().toggle(true);
			break;
   	  }
   	}
  }
  // Grid action MUTE mode
   else if (TEMPMODE === TempMode.MUTE)
   {
   if (isPressed)
   {
      switch(row)
	  {
		 case 1:
			trackBank.getChannel(column).getMute().toggle();
			break;
   	  }
   	}
  }
  // Grid action ARM mode
   else if (TEMPMODE === TempMode.ARM)
   {
   if (isPressed)
   {
      switch(row)
	  {
		 case 1:
			trackBank.getChannel(column).getArm().toggle();
			break;
   	  }
   	}
  }
  // Grid action SELECT mode
   else if (TEMPMODE === TempMode.SELECT)
   {
   if (isPressed)
   {
      switch(row)
	  {
		 case 1:
			trackBank.getChannel(column).select();
			//application.selectNone();
			break;
   	  }
   	}
  }

  // Grid action CUT mode
     else if (TEMPMODE === TempMode.CUT)
   { 
	   if (isPressed)
	   {
	    	  var track = column;
		      var scene = row;
		      var i = track + scene*8;
		      var t = trackBank.getChannel(track);
		      var l = t.getClipLauncher();
		      application.selectNone();
		      l.select(scene);

	   	if (!isCut) {
	   			//t.setIsSubscribed (false);
		      application.cut();
		      isCut = true;
		  } 
		  else 
		  {
		      	application.paste();
		      isCut = false;	
		  }
	    }
    }
   // Grid action COPY mode
   else if (TEMPMODE === TempMode.COPY)
   { 
	   if (isPressed)
	   {
           var track = column;
           var scene = row;
		      var i = track + scene*8;
		      var t = trackBank.getChannel(track);
		      var l = t.getClipLauncher();
		      application.selectAll();
		      l.select(scene);

	   	if (!isCut) {
		      application.copy();
		      isCut = true;
		  } 
		  else 
		  {
		      	application.paste();
		      isCut = false;	
		  }
	    }
    }
   // Grid action SCENE mode
	 else if (TEMPMODE === TempMode.SCENE) {

	 }
}





// updates the grid and ----------------------------------------------------------------------------------------
// it is called in flush function which is called every time as observers detect any changes in bitwig
gridPage.updateGrid = function()
{
	this.allInRow();
   for(var t=0; t<8; t++)
   {
      this.updateTrackValue(t);
   }
};






// used to check if all clips in specific scene are launched or not. it used to light RBs with appropriate colour-------
// Update LEDs
gridPage.allInRow = function() 
{
	if(TEMPMODE == TempMode.OFF || TEMPMODE == TempMode.COLOR_RGB)
	{
		var i = 0;
		for(var scene = 0; scene < 2; scene++)
		{
			isAllInRow[scene] = false;
			for(var track=0; track<numTracks; track++)
			{
				i = track+ scene*NUM_TRACKS_ALL;
			    if (hasContentAll[i]>0) 
			    {
			    	if (isPlayingAll[i]>0) 
			      	{
			      		isAllInRow[scene] = true;
			      	}
			      	else 
			      	{
			      		isAllInRow[scene] = false;
			      		break;
			      	}
				}
			}
			setRightLED(scene, isAllInRow[scene] ? Colour.GREEN : Colour.YELLOW);
		}
	}
	else if (TEMPMODE == TempMode.DEVICE && !isPopup)
	{
        setRightLED(0,  Colour.VIOLET );
        setRightLED(1,  Colour.RED );
	}
    else if ( TEMPMODE == TempMode.EDIT ||(TEMPMODE == TempMode.DEVICE && isPopup) )
    {
        setRightLED(0,  Colour.RED );
        setRightLED(1,  Colour.GREEN );
    }
}






// Update LEDs----------------------------------------------------------------------------------------------------------
gridPage.updateTrackValue = function(track) {
    if (activePage != gridPage) return;
    // this section draws the pads for the main clip launcher

    // Update LEDs MIX
    if (TEMPMODE == TempMode.OFF || TEMPMODE == TempMode.CUT || TEMPMODE == TempMode.COPY) {
        for (var scene = 0; scene < 2; scene++) {
            var i = track + scene * 8;

            var col = arm[track] ? (Colour.GRAY + 200) : ( trackExists[track]) ? Colour.GRAY_HALF : Colour.OFF;

            var fullval = mute[track] ? 1 : 3;

            if (isRecordingQueued[i] > 0) {
                col = Colour.RED_FLASHING;
            }

            if (hasContent[i] > 0) {
                if (isQueued[i] > 0) {
                    col = Colour.GREEN_FLASHING;
                }
                else if (isRecording[i] > 0) {
                    col = Colour.RED;
                }

                else if (isStopQueued[i] > 0) {
                    col = Colour.YELLOW_FLASHING;
                }
                else if (isPlaying[i] > 0) {

                    if (isQueuedForStop[track] > 0) {
                        col = Colour.GREEN_FLASHING;
                    }
                    else {
                        col = Colour.GREEN;
                    }
                }
                else {
                    col = Colour.YELLOW;
                }
            }

            setCellLED(track ,scene , col);

        }
    }

    else if (TEMPMODE == TempMode.COLOR_RGB) {

        for (var c = 0; c < 8; c++)
        {
            for (var r = 0; r < RGB_COLORS.length; r++)
            {
                if (trackColorRGB[c][0] == RGB_COLORS[r][0] &&
                    trackColorRGB[c][1] == RGB_COLORS[r][1] &&
                    trackColorRGB[c][2] == RGB_COLORS[r][2])
                {
                    trackColor[c] = RGB_COLORS[r][3];
                    break;
                }
                else {trackColor[c] = Colour.DARK_GRAY;}
            }
        }

        for (var scene = 0; scene < 2; scene++) {
            var i = track + scene * 8;

            var col = arm[track] ? (trackColor[track]+ 200) : ( trackExists[track]) ? trackColor[track] : Colour.OFF;

            //var fullval = mute[track] ? 1 : 3;


            if (isRecordingQueued[i] > 0) {
                col = Colour.RED_FLASHING;
            }

            if (hasContent[i] > 0) {
                if (isQueued[i] > 0) {
                    col = Colour.GREEN_FLASHING;
                }
                else if (isRecording[i] > 0) {
                    col = Colour.RED;
                }

                else if (isStopQueued[i] > 0) {
                    col = Colour.YELLOW_FLASHING;
                }
                else if (isPlaying[i] > 0) {

                    if (isQueuedForStop[track] > 0) {
                        col = Colour.GREEN_FLASHING;
                    }
                    else {
                        col = Colour.GREEN;
                    }
                }
                else {
                    col = Colour.YELLOW;
                }
            }

            setCellLED(track ,scene , col);

        }
    }


    // Update LEDs padsoff need to reset leds when switch between pads and cliplauncher
    else if (TEMPMODE == TempMode.PADSOFF) {

    }

    else if (TEMPMODE === TempMode.DEVICE && !isPopup) {

        for (var scene = 0; scene < 2; scene++) {
            var col = Colour.OFF;
            if (scene == 0) {
            	if (track < numRCPages) {
                    if (selectedRCPage == track) {
                        col = Colour.BLUE;
                    }
                    else {
                        col = Colour.BLUE_HALF;
                    }
                }
            } else if (scene == 1) {
                if (track < numDevices) {
                    if (cursorDevicePosition == track) {
                        col = Colour.VIOLET;
                    }
                    else {
                        col = Colour.VIOLET_HALF;
                    }
                }
            }
            setCellLED(track, scene, col);
        }
    }

    //Update LEDs sends
    else if (TEMPMODE == TempMode.SEND)
    {
        for ( scene = 0; scene < 2; scene++)
        {
            switch (scene)
            {
                case 0:
                    if (track < numSends){
                        setCellLED(track, scene, Colour.YELLOW_HALF);
                    }
                    else
                    {
                        setCellLED(track, scene, Colour.OFF);
                    }
                break;

                case 1:
                    setCellLED(track, scene,
                    trackExists[track]
                    ? (sendBankIndex == track ? Colour.DARK_BLUE: Colour.DARK_BLUE_HALF) : Colour.OFF );

                break;
            }
        }
    }

    // Update LEDs SOLO
    else if (TEMPMODE == TempMode.SOLO) {

        if (trackExists[track]) {
            setCellLED(track, 0, isMatrixStopped[track] ? Colour.AMBER_HALF : Colour.GREEN);
            setCellLED(track, 1, solo[track] ? Colour.YELLOW : Colour.YELLOW_HALF);
        }
    }

    else if (TEMPMODE == TempMode.MUTE) {

        if (trackExists[track]) {
            setCellLED(track, 0, isMatrixStopped[track] ? Colour.AMBER_HALF : Colour.GREEN);
            setCellLED(track, 1, mute[track] ? Colour.ORANGE : Colour.ORANGE_HALF);
        }
    }

    else if (TEMPMODE == TempMode.ARM) {

        if (trackExists[track]) {
            setCellLED(track, 0, isMatrixStopped[track] ? Colour.AMBER_HALF : Colour.GREEN);
            setCellLED(track, 1, arm[track] ? Colour.RED : Colour.LIGHT_BLUE);
        }
    }

    else if (TEMPMODE == TempMode.SELECT) {

        if (trackExists[track]) {
            setCellLED(track, 0, isMatrixStopped[track] ? Colour.AMBER_HALF : Colour.GREEN);
            setCellLED(track, 1, isSelected[track] ? Colour.LIGHT_BLUE : Colour.LIGHT_BLUE_HALF );
        }
    }

    // Update LEDs Popup browser
    else if (TEMPMODE == TempMode.EDIT ||  (TEMPMODE == TempMode.DEVICE && isPopup)  )  {

        if (trackExists[track]) {
            setCellLED(0, 0,   Colour.RED);
            setCellLED(0, 1,Colour.GREEN);

            setCellLED(1, 0, Colour.ORANGE);
            setCellLED(1, 1, Colour.ORANGE);

            setCellLED(2, 0, Colour.GRAY_HALF);
            setCellLED(2, 1, Colour.GRAY_HALF);

            setCellLED(3, 0, Colour.LIME);
            setCellLED(3, 1, Colour.LIME);

            setCellLED(4, 0, Colour.BLUE_HALF);
            setCellLED(4, 1, Colour.BLUE_HALF);

            setCellLED(5, 0, Colour.GREEN_HALF);
            setCellLED(5, 1, Colour.GREEN_HALF);

            setCellLED(6, 0, Colour.GRAY_HALF);
            setCellLED(6, 1, Colour.GRAY_HALF);

            setCellLED(7, 0, Colour.VIOLET_HALF);
            setCellLED(7, 1, Colour.VIOLET_HALF);
        }
    }

};






//main variety of modes. Switching between them changes functionality of sections --------------------------------------
gridPage.setTempMode = function(mode)
{
   if (mode == TEMPMODE) return;
   
   if (mode === TempMode.OFF && isRGBOn == true)
   {
       TEMPMODE = (TempMode.COLOR_RGB);
       return;
   }
    TEMPMODE = mode;



   // This updates the indicators (The rainbow displays on dials for controlls (userControls number 3 is missing? from original script)
   for(var p=0; p<8; p++)
   {
      var track = trackBank.getChannel(p);
      track.getVolume().setIndication(mode == TempMode.VOLUME);
      track.getPan().setIndication(mode == TempMode.PAN);
      userControls_0.getControl(p).setIndication(mode == TempMode.USER1);

      for (var k = 0; k < NUM_SENDS; k++)
      {
          track.getSend(k).setIndication(mode == TempMode.SEND); //deprecated
      }
   }
};


gridPage.makeSwitchLayout = function () {
    var j = 0;
    return function (array)
    {
        application.setPanelLayout(array[j]);
        j++;
        if(j==array.length)  j=0;

    }
}

gridPage.switchLayout = gridPage.makeSwitchLayout();


// functionality to change layouts or subpanels-------------------------------------------------------------------------
gridPage.switchLayoutOrPanel = function (shiftButton) {
    if (shiftButton)
    {
        this.switchLayout(panelLayoutNames);
    }
    else if (!shiftButton)
    {
        application.nextSubPanel();
    }
};