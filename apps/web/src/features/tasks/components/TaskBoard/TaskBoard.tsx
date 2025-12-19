import {
  DndContext,
  DragEndEvent,
  pointerWithin,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { moveTask } from '@/store/tasks/tasks.slice'
import { TaskColumn } from '../TaskColumn/TaskColumn'
import { TaskStatus } from '@taskflow/types'
import { selectVisibleTasks } from '@/store/filters/filters.selectors'

export function TaskBoard() {
  const dispatch = useAppDispatch()
  const visibleTasks = useAppSelector(selectVisibleTasks)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    dispatch(
      moveTask({
        id: active.id as string,
        to: over.id as TaskStatus,
      })
    )
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // só ativa drag depois de mover 8px
      },
    })
  );

  return (
    <section className="mx-auto mt-6 h-[calc(100vh-160px)] w-full max-w-[1280px]">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        >
        <div className="flex gap-6 overflow-x-auto pb-6">

          <TaskColumn
            title="A fazer"
            status="TODO"
            tasks={visibleTasks.filter((t: { status: string }) => t.status === 'TODO')}
          />

          <TaskColumn
            title="Em progresso"
            status="IN_PROGRESS"
            tasks={visibleTasks.filter((t: { status: string }) => t.status === 'IN_PROGRESS')}
          />

          <TaskColumn
            title="Atrasadas"
            status="DELAYED"
            tasks={visibleTasks.filter((t: { status: string }) => t.status === 'DELAYED')}
          />

          <TaskColumn
            title="Concluídas"
            status="DONE"
            tasks={visibleTasks.filter((t: { status: string }) => t.status === 'DONE')}
          />

        </div>
      </DndContext>
    </section>
  )
}
