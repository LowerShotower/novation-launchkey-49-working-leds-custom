
// CCs for the Top buttons
var TopButton =
{
   CURSOR_UP:112,
   CURSOR_DOWN:113,
   CURSOR_LEFT:102,
   CURSOR_RIGHT:103
};

// CCs for the Mixer Buttons
var MixerButton =
{
   RBTN1:104,
   RBTN2:120,
   FIRSTROW:0,
   SECONDROW:1,
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


var RGB_COLORS =
[
    [ 0.3294117748737335 , 0.3294117748737335 , 0.3294117748737335 , 1 /*"Dark Gray"*/ ],
    [ 0.47843137383461   , 0.47843137383461   , 0.47843137383461   , 117 /*"Gray"*/ ],
    [ 0.7882353067398071 , 0.7882353067398071 , 0.7882353067398071 , 118 /*"Light Gray"*/ ],
    [ 0.5254902243614197 , 0.5372549295425415 , 0.6745098233222961 , 115 /*"Silver"*/ ],
    [ 0.6392157077789307 , 0.4745098054409027 , 0.26274511218070984, 105 /*"Dark Brown"*/ ],
    [ 0.7764706015586853 , 0.6235294342041016 , 0.43921568989753723, 62 /*"Brown"*/ ],
    [ 0.34117648005485535, 0.3803921639919281 , 0.7764706015586853 , 112 /*"Dark Blue"*/ ],
    [ 0.5176470875740051 , 0.5411764979362488 , 0.8784313797950745 , 116 /*"Purplish Blue"*/ ],
    [ 0.5843137502670288 , 0.2862745225429535 , 0.7960784435272217 , 48 /*"Purple"*/ ],
    [ 0.8509804010391235 , 0.21960784494876862, 0.4431372582912445 , 57/*"Pink"*/ ],
    [ 0.8509804010391235 , 0.18039216101169586, 0.1411764770746231 , 60 /*"Red"*/ ],
    [ 1                  , 0.34117648005485535, 0.0235294122248888 , 107 /*"Orange"*/ ],
    [ 0.8509804010391235 , 0.615686297416687  , 0.062745101749897  , 96 /*"Light Orange"*/ ],
    [ 0.45098039507865906, 0.5960784554481506 , 0.0784313753247261 , 63 /*"Green"*/ ],
    [ 0                  , 0.615686297416687  , 0.27843138575553894, 65 /*"Cold Green"*/ ],
    [ 0                  , 0.6509804129600525 , 0.5803921818733215 , 66 /*"Bluish Green"*/ ],
    [ 0                  , 0.6000000238418579 , 0.8509804010391235 , 67 /*"Blue"*/ ],
    [ 0.7372549176216125 , 0.4627451002597809 , 0.9411764740943909 , 56 /*"Light Purple"*/ ],
    [ 0.8823529481887817 , 0.4000000059604645 , 0.5686274766921997 , 52 /*"Light Pink"*/ ],
    [ 0.9254902005195618 , 0.3803921639919281 , 0.34117648005485535, 126 /*"Skin"*/ ],
    [ 1                  , 0.5137255191802979 , 0.24313725531101227, 61 /*"Redish Brown"*/ ],
    [ 0.8941176533699036 , 0.7176470756530762 , 0.30588236451148987, 105 /*"Light Brown"*/ ],
    [ 0.6274510025978088 , 0.7529411911964417 , 0.2980392277240753 , 122 /*"Light Green"*/ ],
    [ 0.24313725531101227, 0.7333333492279053 , 0.3843137323856354 , 123 /*"Grass Green"*/ ],
    [ 0.26274511218070984, 0.8235294222831726 , 0.7254902124404907 , 90 /*"Light Blue"*/ ],
    [ 0.2666666805744171 , 0.7843137383460999 , 1                  , 38 /*"Greenish Blue"*/ ]
];




// Defines the values to be sent for the colours
var Colour = // Novation are from the UK
{
   OFF:0,
    DARK: 1,
   RED_LOW:7, //7
   RED_FULL:72, // 6
   AMBER_LOW:125, //125 100 62
   AMBER_FULL:62,
   YELLOW_FULL:13, //12
   YELLOW_LOW: 113, //113 8
   ORANGE:84, //84 61 96
    ORANGE_LOW: 83,
   LIME:74,
   HEADER:mixColour(0,1,false),
   GREEN_LOW:22,  //19
   GREEN_FULL:122,
    DARKGREEN_LOW:15, //15
    DARKGREEN_FULL:13,
   RED_FLASHING:57,
   AMBER_FLASHING:109,
   YELLOW_FLASHING: 126,
   GREEN_FLASHING:75, //73
    BLUE_FULL:78,
    BLUE_LOW:47, // 39  47 112 44 46  68
    LIGHTBLUE_LOW:65, // 9238
    LIGHTBLUE_FULL:114,
    BLUE_FLASHING:68,
    VIOLET_FULL:48,
    VIOLET_LOW:51, // 39  47 112 44 46  68
    VIOLET_LIGHT:116, //116
    VIOLET_FLASHING:68,
    GRAY_FULL:3,
    GRAY_LOW: 117, //1 71 118
    WHITE: 3, //8 119
    PEACH: 108,
    PINK: 4 //95
};

// defines the LED locations with the pending and active LED arrays for the lights
// They are used in the format LED.SCENE
var LED =
{
   GRID:0,
   SCENE:64,
   TOP:72,
   VOLUME:0,
   PAN:1,
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
var NUM_TRACKS_ALL = 64;
var NUM_SENDS = 8;
var NUM_SCENES = 2;
var NUM_DEVICES = 8;
//var NUM_EFFECT_TRACKS = 1;
//var NUM_EFFECT_SCENES = 1;

//new global variables
//var mixerButtonToggle = false;
//var mixerDetailMode = false;
//var armedToggle = false;
//var sessionButtonToggle = false;
//var seqPageDrumMode = false;
//var seqPageNoteMode = false;
//var sendNumber = 0;
//var setPan = 0;
//var undo1 = false;


