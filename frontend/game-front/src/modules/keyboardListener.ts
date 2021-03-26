interface MoveCommand {
  playerId: string;
  keyPressed: any;
}


export default function createKeyboardListener() {

    const state = {
      observers: [] as any
    }

    function subscribe(obeserverFunction: any) {
      state.observers.push(obeserverFunction)
    }

    function notifyAll(command: MoveCommand) {
      // console.log(`Notifying ${state.observers.length} observers`)

      for (const observerFunction of state.observers) {
        observerFunction(command)
      }
    }
    const handleKeydown = (event: any) => {
      const keyPressed = event.key;


      const command: MoveCommand = {
        playerId: 'Bob',
        keyPressed: keyPressed
      }

      notifyAll(command)
    }

    document.addEventListener('keydown', handleKeydown)

    return {
      subscribe
    }

  }