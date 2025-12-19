import {
  DndContext,
  DragEndEvent,
  pointerWithin,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectTasksByStatus } from '@/store/tasks/task.selectors'
import { moveTask } from '@/store/tasks/tasks.slice'
import { TaskColumn } from '../TaskColumn/TaskColumn'
import { TaskStatus } from '@taskflow/types'

export function TaskBoard() {
  const dispatch = useAppDispatch()

  const todo = useAppSelector(selectTasksByStatus('TODO'))
  const inProgress = useAppSelector(selectTasksByStatus('IN_PROGRESS'))
  const delayed = useAppSelector(selectTasksByStatus('DELAYED'))
  const done = useAppSelector(selectTasksByStatus('DONE'))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const toStatus = over.id as TaskStatus

    dispatch(
      moveTask({
        id: active.id as string,
        to: toStatus,
      })
    )
  }

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8, // só ativa drag depois de mover 8px
    },
  })
)

  return (
    <section className="mx-auto mt-6 h-[calc(100vh-160px)] w-full max-w-[1280px]">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        >
        <div className="flex gap-6 overflow-x-auto pb-6">
          <TaskColumn title="A Fazer" status="TODO" tasks={todo} />
          <TaskColumn title="Em Progresso" status="IN_PROGRESS" tasks={inProgress} />
          <TaskColumn title="Em Atraso" status="DELAYED" tasks={delayed} />
          <TaskColumn title="Concluído" status="DONE" tasks={done} />
        </div>
      </DndContext>
    </section>
  )
}
