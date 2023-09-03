import PositionMouse from '../../components/positionMouse/PositionMouse'

interface CreateRoomProps {}

export default function CreateRoom({}: CreateRoomProps) {
  return (
    <div>
      <h1>crear una sala</h1>

      <div
        style={{
          width: '500px',
          height: '500px',
          outline: '2px solid white',
          position: 'relative',
          margin: 'auto',
        }}
      >
        <PositionMouse />
      </div>
    </div>
  )
}
