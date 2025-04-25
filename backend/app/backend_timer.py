#Backend timer to avoid spindown
import time
import threading #allows program to do multiple 

#create a function to keep your backend constantly running
def backend_timer():
    while True:
        print("Keeping the backend alive at", time.strftime("%H:%M:%S"))
     # -> time.strtime allows you to turn a date or time into a string
        time.sleep(300)
    #option to make a request to your backend

#start timer for the backend using threading or else your could will get stuck
thread = threading.Thread(target=backend_timer, daemon=True)
thread.start()

#backend loop
while True: 
    time.sleep(1)


