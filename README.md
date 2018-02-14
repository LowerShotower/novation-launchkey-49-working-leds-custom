# novation-launchkey-49-working-leds-custom (API 2) Bitwig 2
novation launchkey 49 working leds knobs and sliders, buttons.  All works a little bit different from original ableton or bitwig scripts.

Location: copy MyCompany to: On Windows %USERPROFILE%\Documents\Bitwig Studio\Controller Scripts\ On Mac ~/Documents/Bitwig  Studio/Controller Scripts/ On Linux ~/Bitwig Studio/Controller Scripts/

Main grid in mix mode has two rows i.e. 16 pads. You can create, rec, start,stop, delete clips by pushing pads. Round buttons (RB) launch/stop the whole scene. Nav buttons move grid.  Rec button starts metronome and overdub in clips.  In my approach loop button works as shift button.  It is used : 1) with grid pads (hold Loop_btn + press on grid pad, and if it is clip there, it will be deleted/ if it was not then Empty clip will be created in the current slot 2) with rec_btn: it will rec just as usual. 3) will be described below.
To change controllers behaviour i use several modes: Mix, Drumpads, Device, Cut, Copy, Edit, Solo, Mute, Arm, Select.

Mix: simple grid to launch, stop, rec, create, del clips. Used from start.
Drumpads: simple drumpads for drumming. On as inControl_pad_button is pressed.

Device: manage with device section. Starts on press fb1(fader button 1). first_row of grid - remote_control's pages. Second row - devices. Up to 8 devices. Knobs manage remote_control's parameters. Rb1 (round button 1) used to add first or replace current device. If loop+rb1 - it will add new one after currently selected device. Rb2 delete current device (but it still work not ok, sometimes it doesn't delete[only after selecting a device with mouse in the bitwig it begin to work. Also such a problem happens when you try to delete track or copy, cut clip using launchkey. The problem is connected with selection. For example, if you want to delete clip via keyboard, and  track  is displayed in inspector in bitwig, then track will be deleted. I still don't know how appropreate make bitwig to change selection correctly though i searched through all the API to find the answer and tried to use any of avaliable functions. I will be glad if you share your guesswork with me])

Edit: used to navigate in Popup browser. Use knobs, grid buttons for this. Rb1, rb2 - chancel, commit.

Arm,Solo,Mute,Select: modes activate by holding fb5, fb6, bb7, fb8.

Press Master_btn: then hold fb5 -cut mode; hold fb6 - copy mode. Use the grid to copy paste clips from slot to slot while holding fbs.

Again, Master_btn on: press fb7 - Undo, press fb8 - redo.

Faders control volume of tracks in inControl state.

If you switch off inControl_faders_btn , then fb 1-8 will be used to select track 1-8 in the grid.


NEW_UPDATE__09_02_18: Send section was implemented. Is switched on/off by pressing fader_button_2. Also some constant colours were replaced.  Getting the color of tracks was implemented. It is  switched on/off by pressing fader_button_3 


NEW_UPDATE__11_02_18:  Master_button indication after device is switched off/on has been fixed.  Switch between modes has been fixed. Quantize has been implemented (press Master,then fb_6). 

Holding Loop_btn, then pressing rb1 or rb2 while clips in two scenes are playing will stop playing clips ONLY in the appropriate scene.

Keybindings have been changed:

Master_btn__off: fb1 - Device, fb2 - send,  fb3 - none, fb4 - Layout, fb5,6,7,8 - as usual. 

Master_btn__on: fb1 - Cut, fb2 - copy,  fb3 - create New Instrument Track, fb4 - Color, fb5 - none, fb6 - quantize, fb7,8 - as usual. 

In bitwig there are two unrelated input devices: Launchpad 49 and Launchpad pads

NEW_UPDATE__12_02_18: bug with auto shutdown of Master_btn as inControl_Prads_btn is pressed was fixed. Bug with  incorrect switching on off of drumpads/other modes was fixed. Popup browser scrolling was improved.

NEW_UPDATE__13_02_2018: Take over mode for faders and knobs has been implemented. Test it please. Waiting for your feedbacks =)

TODO: Scaling mode, device on/off,
