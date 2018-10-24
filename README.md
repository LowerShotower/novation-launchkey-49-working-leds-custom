# novation-launchkey-49-working-leds-custom (API 2) Bitwig 2
Bitwig controller script for Novation Launchkey 49.  Working LEDs, knobs, sliders, and buttons.  All work a little bit different than original Ableton or Bitwig scripts.

## Installation
Copy `MyCompany` directory to the appropriate location for your operating system.

* **Windows**: `%USERPROFILE%\Documents\Bitwig Studio\Controller Scripts\`
* **Mac**: `~/Documents/Bitwig  Studio/Controller Scripts/`
* **Linux**: `~/Bitwig Studio/Controller Scripts/`

## Hardware Layout
### Drump Pads
### Knobs
### Sliders
### Transport Controls
### InControl Buttons
#### Top

#### Middle
Turn off to use buttons to select tracks 1-8.
Turn on to use faders to control track volume.

#### Bottom
Turn off to enable pads as drum input
Turn on to make use of Pad Colors.

### 2 Track/MIDI Channel buttons
### 2 full-colour RGB backlit round buttons


## Usage
### Modes
1. Mix (default at startup)
1. Drumpads
1. Devices
1. Edit
1. Solo/Mute
1. Arm
1. Select
1. Cut/Copy


Loop button works as shift button.  It is used in the following ways:

1. with grid pads (hold Loop_btn + press on grid pad, and if it is clip there, it will be deleted/ if it was not then Empty clip will be created in the current slot
2. with rec_btn: it will rec just as usual.
3. will be described below.


#### Mix
Main grid in mix mode has two rows i.e. 16 pads. You can create, record, start, stop, and delete clips by pushing pads.

Round buttons (RB) launch/stop the whole scene.

Move grid using the forward/backward navigation buttons (forward/backward buttons in 6-button group on the right of the keyboard).

Rec button starts metronome and overdub in clips.

##### Pad Colors
* solid green - currently playing
* blinking green - will play (or stop playing) on next transition
  * press again to stop playing
* solid yellow - available to play
  * delete clip with Loop+Pad
* solid red - recording
* blinking white - available to record

#### Drumpads
Enabled when bottom inControl button is off.

#### Devices
Manage with device section. Starts on press fader button 1 (fb1).

First row of grid pad - remote control's pages.
Second row of grid pad - select device (up to 8)

* add first device - rb1
* change device - rb1
* add additional device after first - Loop+rb1
* delete device - rb2 (sometimes buggy)

Knobs manage remote_control's parameters.

Rb2 deletes current device (but it still work not ok, sometimes it doesn't delete[only after selecting a device with mouse in the bitwig it begin to work. Also such a problem happens when you try to delete track or copy, cut clip using launchkey. The problem is connected with selection. For example, if you want to delete clip via keyboard, and  track is displayed in inspector in bitwig, then track will be deleted. I still don't know how appropreate make bitwig to change selection correctly though i searched through all the API to find the answer and tried to use any of avaliable functions. I will be glad if you share your guesswork with me])

#### Edit
Used to navigate in Popup browser. Use knobs, grid buttons for this. Rb1, rb2 - chancel, commit.

#### Arm, Solo, Mute, Select
Modes activated by holding fb5, fb6, fb7, fb8.

#### Arm
Modes activated by holding fb5.

#### Solo/Mute
Modes activated by holding fb6 or fb7.

#### Select
Activated by holding fb8.

#### Cut/Copy
Use the grid to copy paste clips from slot to slot while holding fbs.
Press Master_btn, then:

* hold fb5 -cut mode
* hold fb6 - copy mode
* press fb7 - undo
* press fb8 - redo

### InControl Buttons
#### Top
#### Middle
Turn off to use buttons to select tracks 1-8.
Turn on to use faders to control track volume.
#### Bottom
Turn off to enable pads as drum input
Turn on to make use of Pad Colors.


## Updates
### 09 Feb 2018
Send section was implemented. It is switched on/off by pressing fader_button_2. Also some constant colours were replaced.  Getting the color of tracks was implemented. It is switched on/off by pressing fader_button_3. 

### 11 Feb 2018
Master_button indication after device is switched off/on has been fixed.  Switch between modes has been fixed. Quantize has been implemented (press Master, then fb_6). 

Holding Loop_btn, then pressing rb1 or rb2 while clips in two scenes are playing will stop playing clips ONLY in the appropriate scene.

Keybindings have been changed:

Master_btn__off:

* fb1 - device
* fb2 - send
* fb3 - none
* fb4 - layout
* fb5, 6, 7, 8 - as usual. 

Master_btn__on:

* fb1 - cut
* fb2 - copy
* fb3 - create new instrument track
* fb4 - color
* fb5 - none
* fb6 - quantize
* fb7, 8 - as usual. 

In Bitwig you can find two unrelated input devices: Launchpad 49 and Launchpad pads.

### 12 Feb 2018
Bug with auto shutdown of Master_btn as inControl_Prads_btn is pressed was fixed. Bug with  incorrect switching on off of drumpads/other modes was fixed. Popup browser scrolling was improved.

### 13 Feb 2018
Take over mode for faders and knobs has been implemented. Test it please. Waiting for your feedback. =)

## TODO
1. Scaling mode
1. Device on/off
