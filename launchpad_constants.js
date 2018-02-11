
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


// Defines the values to be sent for the colours
var Colour = // Novation are from the UK
{
    Dark_Gray:71,
    Dark_Gray_fl:271,
    Gray:117,
    Gray_fl:317,
    Light_Gray:119,
    Light_Gray_fl:319,
    Silver:115,
    Silver_fl:315,
    Dark_Brown:83,
    Dark_Brown_fl:283,
    Brown:105,
    Brown_fl:305,
    Dark_Blue:51,
    Dark_Blue_fl:251,
    Purplish_Blue:112,
    Purplish_Blue_fl:312,
    Purple:55,
    Purple_fl:255,
    Pink:57,
    Pink_fl:257,
    Red:6,
    Red_fl:206,
    Orange:10,
    Orange_fl:210,
    Light_Orange:100,
    Light_Orange_fl:300,

    Green:18,
    Green_fl:218,
    Cold_Green:22,
    Cold_Green_fl:222,
    Bluish_Green:65,
    Bluish_Green_fl:265,
    Blue:66,
    Blue_fl:266,

    Light_Purple:52,
    Light_Purple_fl:252,
    Light_Pink:56,
    Light_Pink_fl:256,

    Skin:107,
    Skin_fl:307,
    Redish_Brown:126,
    Redish_Brown_fl:326,
    Light_Brown:15, //62 12
    Light_Brown_fl:309,

    Light_Green:17,
    Light_Green_fl:217,
    Grass_Green:21,
    Grass_Green_fl:221,

    Light_Blue:34,
    Light_Blue_fl:234,
    Greenish_Blue:37,
    Greenish_Blue_fl:237,

    OFF:0,
    DARK_GRAY: 1,
    WHITE: 3,
    PEACH: 108,
    LIME:74,
    HEADER:mixColour(0,1,false),
    PINK: 4,

    RED_HALF:7,
    RED:5,
    RED_FLASHING:205,

    AMBER_HALF:11,
    AMBER:96,
    AMBER_FLASHING:294,

    YELLOW:13,
    YELLOW_HALF: 15,
    YELLOW_FLASHING: 213,

    DARK_YELLOW : 17,
    DARK_YELLOW_HALF :19,

    ORANGE:9,
    ORANGE_HALF: 11,

    DARK_ORANGE :84,

    GREEN_HALF:27,
    GREEN:21,
    GREEN_FLASHING:221,

    DARK_BLUE_HALF:51,
    DARK_BLUE:49,

    BLUE:45,
    BLUE_HALF:47,
    BLUE_FLASHING:245,

    LIGHTBLUE_HALF:39,
    LIGHTBLUE:37,

    VIOLET:48,
    VIOLET_HALF:51,
    LIGHT_VIOLET:116,
    VIOLET_FLASHING:248,

    GRAY:2,
    GRAY_HALF: 71,

    MINT :29,
    MINT_HALF :31,

    PURPLE:53,
    PURPLE_HALF: 55
};


var RGB_COLORS =
    [
        [ 0.3294117748737335 , 0.3294117748737335 , 0.3294117748737335 , Colour.Dark_Gray ],
        [ 0.47843137383461   , 0.47843137383461   , 0.47843137383461   , Colour.Gray ],
        [ 0.7882353067398071 , 0.7882353067398071 , 0.7882353067398071 , Colour.Light_Gray ],
        [ 0.5254902243614197 , 0.5372549295425415 , 0.6745098233222961 , Colour.Silver ],
        [ 0.6392157077789307 , 0.4745098054409027 , 0.26274511218070984, Colour.Dark_Brown ],
        [ 0.7764706015586853 , 0.6235294342041016 , 0.43921568989753723, Colour.Brown ],
        [ 0.34117648005485535, 0.3803921639919281 , 0.7764706015586853 , Colour.Dark_Blue ],
        [ 0.5176470875740051 , 0.5411764979362488 , 0.8784313797950745 , Colour.Purplish_Blue ],
        [ 0.5843137502670288 , 0.2862745225429535 , 0.7960784435272217 , Colour.Purple ],
        [ 0.8509804010391235 , 0.21960784494876862, 0.4431372582912445 , Colour.Pink ],
        [ 0.8509804010391235 , 0.18039216101169586, 0.1411764770746231 , Colour.Red ],
        [ 1                  , 0.34117648005485535, 0.0235294122248888 , Colour.Orange ],
        [ 0.8509804010391235 , 0.615686297416687  , 0.062745101749897  , Colour.Light_Orange ],
        [ 0.45098039507865906, 0.5960784554481506 , 0.0784313753247261 , Colour.Green ],
        [ 0                  , 0.615686297416687  , 0.27843138575553894, Colour.Cold_Green ],
        [ 0                  , 0.6509804129600525 , 0.5803921818733215 , Colour.Bluish_Green ],
        [ 0                  , 0.6000000238418579 , 0.8509804010391235 , Colour.Blue ],
        [ 0.7372549176216125 , 0.4627451002597809 , 0.9411764740943909 , Colour.Light_Purple ],
        [ 0.8823529481887817 , 0.4000000059604645 , 0.5686274766921997 , Colour.Light_Pink ],
        [ 0.9254902005195618 , 0.3803921639919281 , 0.34117648005485535, Colour.Skin ],
        [ 1                  , 0.5137255191802979 , 0.24313725531101227, Colour.Redish_Brown ],
        [ 0.8941176533699036 , 0.7176470756530762 , 0.30588236451148987, Colour.Light_Brown ],
        [ 0.6274510025978088 , 0.7529411911964417 , 0.2980392277240753 , Colour.Light_Green ],
        [ 0.24313725531101227, 0.7333333492279053 , 0.3843137323856354 , Colour.Grass_Green ],
        [ 0.26274511218070984, 0.8235294222831726 , 0.7254902124404907 , Colour.Light_Blue ],
        [ 0.2666666805744171 , 0.7843137383460999 , 1                  , Colour.Greenish_Blue ]
    ];


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


