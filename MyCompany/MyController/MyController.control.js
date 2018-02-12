//don't change this
var userVarPans = 8;

// Playing of pad on velocity change is turned off, setting this to true will turn it on
var userVelNote = false;

// New velocity setup, has a set number for low and high, and you use the two middle buttons to index the rest of the velocities.velocity setup is in Launchpad_Step_Sequencer.js
var velocities2 = [];
for	(index = 127; index > -1; index--)
{
    velocities2[velocities2.length] = index;
}

loadAPI(2);
//application.setShouldFailOnDeprecatedUse(false);
// TempMode is a variable used for the Temporary views used in ClipLauncher mode.
var TempMode =
{
   OFF:-1,
   VOLUME:0,
   PAN:1,
   SEND:2,
   TRACK:4,
   SCENE:5,
   USER1:6,
   USER2:7,
   USER3:8,
   PADSOFF:9,
   EDIT:10,
   SOLO:11,
   MUTE: 12,
   ARM: 13,
   SELECT:14,
   CUT:15,
   COPY:16,
   DEVICE:17,
    FADERS:18,
    COLOR_RGB:19
};



var TEMPMODE = -1;
var numTracks; //used to know current number of tracks. Up to 64.
var numSends = 0;//used to show the correct number of tracks that are displayed on grid
var indexToStart = 0; //index of track from which grid of clips will be drawn
var isAllInRow = initArray(0,2); // array to hold information about stoped/launched clips in two rows
var isCut = false;
var cursorDevicePosition = -1;
var cursorDeviceName;
var selectedRCPage = -1;
var numRCPages = -1;
var numDevices = -1;
//var devName;
var contentTypeIndex=0;
var sendBankIndex = 0;
//var isInc = false;
var isRGBOn = false;

var entryCount = {};//entry count in popup columns
var isPopup = false;


var incontrol_pads=true;
var incontrol_mix = true;
var incontrol_knobs = true;

var IS_MASTER_TOGGLED = false;
var IS_LOOP_PRESSED = false;
var IS_SHIFT_PRESSED = false;

// Declare arrays which are used to store information received from Bitwig about what is going on to display on pads
//var volume = initArray(0, 8);
//var pan = initArray(0, 8);
var mute = initArray(0, 8);
var solo = initArray(0, 8);
var arm = initArray(0, 8);
var isMatrixStopped = initArray(0, 8);
var isSelected = initArray(0, 8);
var isQueuedForStop = initArray(0, 8);
var trackExists = initArray(0, 8);
var trackColorRGB = [[,,],[,,],[,,],[,,],[,,],[,,],[,,],[,,]];
var trackColor = initArray(0,8);
//var sendExists = initArray (0, 8);
var panelLayoutNames = ["EDIT","MIX","ARRANGE"];
var vuMeter = initArray(0, 8);
var masterVuMeter = 0;

var userValue = initArray(0, 24);

var hasContent = initArray(0, 64);
var isPlaying = initArray(0, 64);

var isRecording = initArray(0, 64);
var isQueued = initArray(0, 64);
var isRecordingQueued = initArray(0, 64);
var isStopQueued = initArray(0, 64);

//Used to monitor if all in two rows are playing. it's is not detect whether any of existing clips in tracks are playing. Only current two rows
var isPlayingAll = initArray(0, 128);
var hasContentAll = initArray(0,128);// array to carry information about to rows, up to 64 tracks

//Check if tracks are playing
var isTrackPlaying = initArray (0,32);

var activePage = null;

var noteOn = initArray(false, 128);
var WRITEOVR = false;






host.defineController("MyCompany", "MyController", "1.0", "1269fa00-fe0b-11e7-8f1a-0800200c9a66");
host.defineMidiPorts(2, 2);
host.addDeviceNameBasedDiscoveryPair(["Launchkey MIDI","MIDIIN2 (Launchkey MIDI)"], ["Launchkey MIDI","LMIDIOUT2 (Launchkey MIDI)"]);

//load("MyController_common.js");
// loads up the other files needed
load("launchpad_constants.js"); // contains CCs, Colour values and other variables used across the scripts
load("launchpad_page.js"); // defines the page type which is used for the different pages on the Launchpad
//load("launchpad_notemap.js"); // works out all the notemaps, the scales and drawing of the black and white keys
load("launchpad_grid.js"); // draws the main clip launcher and other pages such as volume, pan, sends, and user controls
//load("launchpad_keys.js"); // draws the keys as set in launchpad_notemap and places them across the pads
//load("launchpad_step_sequencer.js"); // everything to do with the step sequencer






// activePage is the page displayed on the Launchpad, the function changes the page and displays popups
function setActivePage(page)
{
   var isInit = activePage == null;

   if (page != activePage)
   {
      activePage = page;
      if (!isInit)
      {
         host.showPopupNotification(page.title);
      }

      // Update indications in the app
      for(var p=0; p<8; p++)
      {
         var track = trackBank.getTrack(p);
         track.getClipLauncher().setIndication(activePage == gridPage);
      }
   }
}






function getEntryCountObserverFunc(keyName)
{
    return function(value)
    {
        if (value < 40) {value=40}

        entryCount[keyName] = value;
    }
}

// Observer functions to store receive information into the above arrays
function getTrackObserverFunc(track, varToStore)
{
   return function(value)
   {
      varToStore[track] = value;
   }
}

function getTrackColorObserverFunc(track, varToStore)
{
    return function(value1, value2, value3)
    {
        varToStore[track][0] = value1; //R
        varToStore[track][1] = value2; //G
        varToStore[track][2] = value3;  //B
    }
}



function getGridObserverFunc(track, varToStore)
{
   return function(scene, value)
   {
      varToStore[scene*8 + track] = value;
   }
}

//used to check variable number of tracks up to 32, This information is saved in array, which is used by round buttons to
// set its light (yellow of green) whether all clips in scene are playing (yellow) or stopped (green)
function getGridObserverFuncAll(track, varToStore)
{
   return function(scene, value)
   {
      varToStore[scene*NUM_TRACKS_ALL + track] = value;
      if (varToStore == isPlayingAll)
       {
       isTrackPlaying[track] = value;
       }
   }
}







// The init function gets called when initializing by Bitwig
function init()
{
	host.getMidiInPort(0).createNoteInput("Launchkey 49", "80????", "90????", "B001??", "D0????", "E0????");
   noteInput = host.getMidiInPort(0).createNoteInput("Launchkey Pads", "89????", "99????");
   noteInput.setShouldConsumeEvents(false);

   host.getMidiInPort(0).setMidiCallback(onMidi0);
   host.getMidiInPort(1).setMidiCallback(onMidi1);

   transport = host.createTransport();
   application = host.createApplication();
   popupBrowser = host.createPopupBrowser();

   //For popup browser column nav
   deviceTypeCursorItem = popupBrowser.deviceTypeColumn().createCursorItem();
   locationCursorItem = popupBrowser.locationColumn().createCursorItem();
   deviceCursorItem = popupBrowser.deviceColumn().createCursorItem();
   categoryCursorItem = popupBrowser.categoryColumn().createCursorItem();
   tagCursorItem = popupBrowser.tagColumn().createCursorItem();


   // Cursor track allow selection of a track
   cursorTrack = host.createCursorTrack(0, 8);
   deviceBank = cursorTrack.createDeviceBank(NUM_DEVICES);
   primaryDevice = cursorTrack.createCursorDevice("Primary");

    // Created a Cursor Clip section. I believe this section is used to create a section used on the Drum Machine device
    // ToDO: host.createCursorClipSection is deprecated and should be updated
    cursorClip = host.createLauncherCursorClip(128, 128);
    //cursorClip.addStepDataObserver(seqPage.onStepExists);
    //cursorClip.scrollToKey(0)
   
   
    cursorDevice = cursorTrack.createCursorDevice();
    cursorRCPage = cursorDevice.createCursorRemoteControlsPage(8);
    cursorDeviceBrowser = cursorDevice.createDeviceBrowser(40,40);

    // a Trackbank is the tracks, sends and scenes being controlled, these arguments are set to 8,2,8 in the
    // launchpad_constants.js file changing them will change the size of the grid displayed on the Bitwig Clip Launcher
    trackBank = host.createMainTrackBank(NUM_TRACKS, NUM_SENDS, NUM_SCENES);
    trackBankAll = host.createMainTrackBank(NUM_TRACKS_ALL, 0 , 2);


    //cursorTrack.addNoteObserver(seqPage.onNotePlay);
    //deviceBank = cursorTrack.createDeviceBank(1);

    // Picks up the Master Track from Bitwig for use displaying the VuMeter
    masterTrack = host.createMasterTrack(0);

    masterTrack.addVuMeterObserver(8, -1, true, function(level)
    {
        masterVuMeter = level;
    });



   //Block of different popup browser steps
   //specificaly it is used to set the number of steps which it can scroll up/down in whole rotation for the first knob ( page choosing)
    entryCount[1] = 10;

    // It can be used to detect number of entries in specific column. This number is equal to amount of steps . It uses to scroll over great amount of entries
    popupBrowser.deviceTypeColumn().entryCount().addValueObserver(getEntryCountObserverFunc(2));

    //it is fixed amount of available steps
    //entryCount[2] = 10;

    popupBrowser.locationColumn().entryCount().addValueObserver(getEntryCountObserverFunc(3));
    //entryCount[3] = 100;

    popupBrowser.deviceColumn().entryCount().addValueObserver(getEntryCountObserverFunc(4));
    //entryCount[4] = 100;

    popupBrowser.categoryColumn().entryCount().addValueObserver(getEntryCountObserverFunc(5));
    //entryCount[5] = 100;

    popupBrowser.tagColumn().entryCount().addValueObserver(getEntryCountObserverFunc(6));
    //entryCount[6] = 100;

    popupBrowser.resultsColumn().entryCount().addValueObserver( getEntryCountObserverFunc(7) );


    popupBrowser.exists().addValueObserver(function(value){ isPopup = value; });


    transport.addLauncherOverdubObserver(function(state){ WRITEOVR=state; });


    trackBank.addChannelCountObserver(function(value){numTracks = value;/*println(numTracks);*/});





    //observers to track all the clips in two scenes
   for (var t = 0; t < NUM_TRACKS_ALL; t++) 
   {
   		var clipLauncherAll = trackBankAll.getChannel(t).getClipLauncherSlots();
   		clipLauncherAll.addHasContentObserver(getGridObserverFuncAll(t, hasContentAll));
      	clipLauncherAll.addIsPlayingObserver(getGridObserverFuncAll(t, isPlayingAll));
   }




   // This scrolls through the controllable tracks and clips and picks up the info from Bitwig to later display/control, it stores them in the arrays declared above
   for(var t=0; t<NUM_TRACKS; t++)
   {
      var track = trackBank.getChannel(t);

      track.sendBank().itemCount().addValueObserver(function (value){numSends = value;});

      for (var sendIndex = 0; sendIndex < NUM_SENDS; sendIndex++)
      { //  track.sendBank().getItemAt(sendIndex).addValueObserver(63, getTrackObserverFunc(t, sends));//63 is range to scale value
      }

      //track.getVolume().addValueObserver(8, getTrackObserverFunc(t, volume));
      //track.getPan().addValueObserver(userVarPans, getTrackObserverFunc(t, pan));
      track.getMute().addValueObserver(getTrackObserverFunc(t, mute));
      track.getSolo().addValueObserver(getTrackObserverFunc(t, solo));
      track.getArm().addValueObserver(getTrackObserverFunc(t, arm));
      track.color().addValueObserver(getTrackColorObserverFunc(t, trackColorRGB));

      track.getIsMatrixStopped().addValueObserver(getTrackObserverFunc(t, isMatrixStopped));
      track.exists().addValueObserver(getTrackObserverFunc(t, trackExists));
      track.addVuMeterObserver(7, -1, true, getTrackObserverFunc(t, vuMeter));
      track.addIsSelectedObserver(getTrackObserverFunc(t, isSelected));
      track.addIsQueuedForStopObserver(getTrackObserverFunc(t, isQueuedForStop));
       
      var clipLauncher = track.getClipLauncherSlots();

      clipLauncher.addHasContentObserver(getGridObserverFunc(t, hasContent));
      clipLauncher.addIsPlayingObserver(getGridObserverFunc(t, isPlaying));
      clipLauncher.addIsRecordingObserver(getGridObserverFunc(t, isRecording));
      clipLauncher.addIsQueuedObserver(getGridObserverFunc(t, isQueued));
      clipLauncher.addIsRecordingQueuedObserver(getGridObserverFunc(t, isRecordingQueued));
      clipLauncher.addIsStopQueuedObserver(getGridObserverFunc(t, isStopQueued));
   }




   deviceBank.itemCount().addValueObserver(function (value){
       numDevices= value;}, 0 );

   cursorRCPage.selectedPageIndex().addValueObserver(function (value){
       selectedRCPage= value;}, -1 );

   cursorRCPage.pageNames().addValueObserver(function (value){
        numRCPages= value.length;} );

   cursorDevice.position().addValueObserver(function (value){
        cursorDevicePosition = value;}, -1 );

   cursorDevice.name().addValueObserver(function (value){
        cursorDeviceName = value;} );



   // These next 4 pick up whether the Clip Launcher can be moved
   trackBank.addCanScrollTracksUpObserver(function(canScroll)
   {
      gridPage.canScrollTracksUp = canScroll;
   });

   trackBank.addCanScrollTracksDownObserver(function(canScroll)
   {
      gridPage.canScrollTracksDown = canScroll;
   });

   trackBank.addCanScrollScenesUpObserver(function(canScroll)
   {
      gridPage.canScrollScenesUp = canScroll;
   });

   trackBank.addCanScrollScenesDownObserver(function(canScroll)
   {
      gridPage.canScrollScenesDown = canScroll;
   });




   // Picks up the controllable knobs, buttons which have been set via "Learn Controller Assignment". There are 24 set
    // here because there are 3 pages of user controls with 8 assignable controls on each
   userControls_0 = host.createUserControls(24);

    //?????????????????????????????????????????????????????????????????????????????????????????
   for(var u=0; u<24; u++)
   {
      var control = userControls_0.getControl(u);
      control.addValueObserver(8, getTrackObserverFunc(u, userValue));
      control.setLabel("U" + (u+1));
   }

   ;

    //?????????????????????????????????????????????????????????????????????????????????????????
   for(var p=0; p<8; p++)
   {
      userControls_0.getControl(p).setLabel("User " + (p + 1));
   }


   // Turn extended mode on.
   host.getMidiOutPort(1).sendMidi(159, 12, 127);
   updateIndications();


    // Call resetdevice which clears all the lights
   resetDevice();
   setActivePage(gridPage);
}




// Reset all lights by sending MIDI and sets all values in the pendingLEDs array to 0
function resetDevice()
{
   resetGrid();
    reswitchMasterLED();
}

function resetGrid() {
    for(var i=0; i<80; i++)
    {
        pendingLEDs[i] = 0;
    };
    flushLEDs();
}

function reswitchMasterLED() {
    host.getMidiOutPort(1).sendMidi(191,59,0);
    IS_MASTER_TOGGLED=false;
}


function updateIndications()
{
   for(var i=0; i<8; i++)
   {
      //cursorDevice.getParameter(i).setIndication(incontrol_knobs);
      trackBank.getTrack(i).getVolume().setIndication(incontrol_mix);
   }
}




function exit()
{
    resetDevice();
    host.getMidiOutPort(1).sendMidi(159, 12, 0);

}




// Clears all the lights
function clear()
{
   for(var i=0; i<80; i++)
   {
      pendingLEDs[i] = Colour.OFF;
   }
}




function flush()
{
   activePage.updateOutputState();
   flushLEDs();
}




function onMidi0(status, data1, data2)
{
    //printMidi(status, data1, data2);
   if (isChannelController(status))
   {
       activePage.onFaders(incontrol_mix, data1, data2);
       activePage.onPots(incontrol_knobs, data1, data2);
   }
}




function onMidi1(status, data1, data2)
{

   // printMidi(status, data1, data2);
   if (isChannelController(status))
   { 
     activePage.onFaders(incontrol_mix, data1, data2);
     activePage.onPots(incontrol_knobs, data1, data2);
   }

   if (isChannelController(status))
   {

      // isPressed checks whether MIDI signal is above 0 in value declaring that button is being pressed
      var isPressed = data2 > 0;
      //printMidi(status, data1, data2);

	  // This section changes the page within the script displayed on the device
	  // data1 is the CC, the CC values are defined within the launchpad_contants script and range from 104 to 111 for the topbuttons
      switch(data1)
      {

         case TopButton.CURSOR_LEFT:
            activePage.onLeft(isPressed);
            //println("left is pressed");
            break;

         case TopButton.CURSOR_RIGHT:
            activePage.onRight(isPressed);
             //println("right is pressed");
            break;

         case TopButton.CURSOR_UP:
            activePage.onUp(isPressed);
             //println("up is pressed");
            break;

         case TopButton.CURSOR_DOWN:
            activePage.onDown(isPressed);
            //println("down is pressed");
            break;

         case OtherButton.MASTER:
         	//println("MASTER is pressed");
            activePage.onOtherButton(OtherButton.MASTER, data2 > 0);
            break;
            
         case OtherButton.LOOP:
         	activePage.onOtherButton(OtherButton.LOOP, data2 > 0);
            break;

         case OtherButton.RECORD:
         	activePage.onOtherButton(OtherButton.RECORD, data2 > 0);
            break;

         case OtherButton.PLAY:
         	activePage.onOtherButton(OtherButton.PLAY, data2 > 0);
            break;

         case OtherButton.STOP:
         	activePage.onOtherButton(OtherButton.STOP, data2 > 0);
            break;

        case OtherButton.FB1:
 		case OtherButton.FB2:
 		case OtherButton.FB3:
 		case OtherButton.FB4:
 		case OtherButton.FB5:
 		case OtherButton.FB6:
 		case OtherButton.FB7:
 		case OtherButton.FB8:
 			activePage.onOtherButton(data1, data2 > 0);
 		break;
      }
   }

   if (isNoteOn(status) || isNoteOff(status, data2))
   {
   		if (data1 >= 96 && data1 <= 120)
   		{
   			 var row = (data1-96) >> 4 ;
		     var column = data1 & 0xF;
		         
		     ////println("row = " + row + "col = " + column)

		     if (column < 8)
		     {
		         activePage.onGridButton(row, column, data2 > 0);
		     }
		     else
		     {
		         activePage.onSceneButton(row, data2 > 0);
		     }
   		}
   		else if (data1>=13 && data1 <= 16) 
   		{
   			activePage.onOtherButton(data1, data2 > 0);
   			updateIndications();
   		}
   }
}





// Sends the Top LED lights to the pendingLEDs array. LED top have a value of 72 to 80
function setTopLED(index, colour)
{
   pendingLEDs[LED.TOP + index] = colour;
}





// Sends the right LED lights to the pendingLEDs array. LED scene have a value of 64 to 72
function setRightLED(index, colour)
{
   pendingLEDs[LED.SCENE + index] = colour;
}




// Sends the main pads to the pendingLEDs array. LED scene have a value of 0 to 63
function setCellLED(column,row, colour)
{
   var key = row * 8 + column;
   pendingLEDs[key] = colour;
}

function switchMasterLED(isToggled)
    {
        if (!isToggled)
        {
            host.getMidiOutPort(1).sendMidi(191,59,127);
        }
        else
        {
            host.getMidiOutPort(1).sendMidi(191,59,0);
        }
        IS_MASTER_TOGGLED =!isToggled;
    }





// arrays of 80 buttons, the main 64 pads and the 8 at the top and 8 at side. Pending is used for lights to be sent, active contains the lights already on
var pendingLEDs = new Array(80);
var activeLEDs = new Array(80);





// This function compares the LEDs in pending to those in active and if there is a difference it will send them via MIDI message
// If there is more than 30 lights changed it sends the MIDI in a single message ("optimized mode") rather than individually
function flushLEDs()
{
	// changedCount contains number of lights changed
   var changedCount = 0;

   // count the number of LEDs that are going to be changed by comparing pendingLEDs to activeLEDs array
   for(var i=0; i<80; i++)
   {
      if (pendingLEDs[i] != activeLEDs[i]) changedCount++;
   }

   // exit function if there are none to be changed
   if (changedCount == 0) return;

   //uncommenting this displays a count of the number of LEDs to be changed
  // //println("Repaint: " + changedCount + " LEDs");

  for(var i = 0; i<80; i++)
  {
     if (pendingLEDs[i] != activeLEDs[i])
     {  
        activeLEDs[i] = pendingLEDs[i];

        var colour = activeLEDs[i];

        if (i < 16) // Main Grid
        {
           var column = i & 0x7;
           var row = i >> 3;

           if (colour >=200 && colour < 328)//flashing colour numeration. need to substract 200 to get the appropriate final color
           {
               host.getMidiOutPort(1).sendMidi(0x92, 96 + row*16 + column, colour-200);
           }
           else
           {
               host.getMidiOutPort(1).sendMidi(0x9F, 96 + row*16 + column, colour);
           }
       }

       else if (i>=64 && i < 66)    // Right buttons
        {
           host.getMidiOutPort(1).sendMidi(0x9F, 96 + 8 + (i - 64) * 16, colour);
        }
     }
  }
}

