# novation-launchkey-49-working-leds-custom (API 2)
novation launchkey 49 working leds knobs and sliders, buttons.  All works a little bit different from original ableton or bitwig scripts.
Main grid in mix mode has two rows i.e. 16 pads. You can rec, start,stop clips by pushing pads. Round buttons (RB) launch/stop the whole scene. Nav buttons move grid.  Rec button starts metronome and overdub in clips.  In my approach loop button works as shift button.  It is used : 1) with grid pads (hold Loop_btn + press on grid pad, and if it is clip there, it will be deleted 2) with rec_btn: it will rec just as usual. 3) will be described below.
To change controllers behaviour i use several modes: Mix, Drumpads, Device, Cut, Copy, Edit, Solo, Mute, Arm, Select.
Mix: simple grid to launch, stop, rec, del clips. Used from start.
Drumpads: simple drumpads for drumming. On as inControl_pad_button is pressed.
Device: manage with device section. Starts on press fb1(fader button 1). first_row of grid - remote_control's pages. Second row - devices. Up to 8 devices. Knobs manage remote_control's parameters. Rb1 (round button 1) used to add first or replace current device. If loop+rb1 - it will add new one after currently selected device. Rb2 delete current device (but it still work not ok, sometimes it doesn't delete[only after selecting a device with mouse in the bitwig it begin to work.])
Edit: used to navigate in Popup browser. Use knobs, grid buttons for this. Rb1, rb2 - chancel, commit.
Arm,Solo,Mute,Select: modes activate by holding fb5, fb6, bb7, fb8.
Press Master_btn: then hold fb5 -cut mode; hold fb6 - copy mode. Use the grid to copy paste clips from slot to slot while holding fbs.
Again, Master_btn on: press fb7 - Undo, press fb8 - redo.
Faders control volume of tracks.
In conclusion, if you press inControl_faders_btn to off, then fb 1-8 - it will select track 1-8 in the grid.

