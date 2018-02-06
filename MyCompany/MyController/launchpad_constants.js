
// CCs for the Top buttons
var TopButton =
{
   CURSOR_UP:112,
   CURSOR_DOWN:113,
   CURSOR_LEFT:102,
   CURSOR_RIGHT:103,
   SESSION:108,
   USER1:109,
   USER2:110,
   MIXER:111
};

// CCs for the Mixer Buttons
var MixerButton =
{
   RBTN1:104,
   RBTN2:120,
   FIRSTROW:0,
   SECONDROW:1,
   SEND_A:2,
   SEND_B:3,
   STOP:4,
   TRK_ON:5,
   SOLO:6,
   ARM:7
};

var OtherButton =
{
	LOOP:116,
	STOP:114,
	PLAY:115,
	RECORD:117,
	MASTER:59,
	FB1:51,
	FB2:52,
	FB3:53,
	FB4:54,
	FB5:55,
	FB6:56,
	FB7:57,
	FB8:58
};

// Called the scripts mainly within launchpad_grid
// It is used for the Bitwig logo and the VUmeter
function mixColour(red, green, blink)
{
   return (blink ? 8 : 12) | red | (green * 16);
}

// Defines the values to be sent for the colours
var Colour = // Novation are from the UK
{
   OFF:0,
   RED_LOW:7, //7
   RED_FULL:72,
   AMBER_LOW:62,
   AMBER_FULL:100,
   YELLOW_FULL:12,
   YELLOW_LOW: 113,
   ORANGE:9,
   LIME:74,
   HEADER:mixColour(0,1,false),
   GREEN_LOW:22,
   GREEN_FULL:122,
   RED_FLASHING:57,
   AMBER_FLASHING:126,
   YELLOW_FLASHING:109,
   GREEN_FLASHING:75, //73
    BLUE_FULL:78,
    BLUE_LOW:47, // 39  47 112 44 46  68
    BLUE_FLASHING:68,
    VIOLET_FULL:48,
    VIOLET_LOW:51, // 39  47 112 44 46  68
    VIOLET_FLASHING:68,
    GRAY_FULL:3,
    GRAY_LOW: 1, //71
    WHITE: 3
};

// defines the LED locations with the pending and active LED arrays for the lights
// They are used in the format LED.SCENE
var LED =
{
   GRID:0,
   SCENE:64,
   TOP:72,

   CURSOR_UP:0,
   CURSOR_DOWN:1,
   CURSOR_LEFT:2,
   CURSOR_RIGHT:3,
   SESSION:4,
   USER1:5,
   USER2:6,
   MIXER:7,


   VOLUME:0,
   PAN:1,
   SEND_A:2,
   SEND_B:3,
   STOP:4,
   TRK_ON:5,
   SOLO:6,
   ARM:7,
   RBTN1: 8,
   RBNT2: 9
};

// Number of tracks, sends and scenes, they are called from the Launchpad.control.js file only during the init() function
var NUM_TRACKS = 8;
//Needed to scan through the scene to check if any of existing tracks are playing ore stoped
var NUM_TRACKS_ALL = 32;
var NUM_SENDS = 2;
var NUM_SCENES = 2;
var NUM_DEVICES = 8;
var NUM_EFFECT_TRACKS = 1;
var NUM_EFFECT_SCENES = 1;

//new global variables
var mixerButtonToggle = false;
var mixerDetailMode = false;
var armedToggle = false;
var sessionButtonToggle = false;
var seqPageDrumMode = false;
var seqPageNoteMode = false;
var sendNumber = 0;
var setPan = 0;
var undo1 = false;


