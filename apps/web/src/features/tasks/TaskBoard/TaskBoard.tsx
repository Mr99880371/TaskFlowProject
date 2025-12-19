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
import type { TaskWithComputedFields } from '@taskflow/domain'

const WIP_LIMIT = 3
const WIP_COLUMNS: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DELAYED', 'DONE']
const DRAG_ACTIVATION_DISTANCE = 8

const COLUMNS = [
  { title: 'A fazer', status: 'TODO' as TaskStatus },
  { title: 'Em progresso', status: 'IN_PROGRESS' as TaskStatus },
  { title: 'Atrasadas', status: 'DELAYED' as TaskStatus },
  { title: 'Concluídas', status: 'DONE' as TaskStatus },
]

export function TaskBoard() {
  const dispatch = useAppDispatch()
  const visibleTasks = useAppSelector(selectVisibleTasks)
  const allTasks = useAppSelector(state => state.tasks.allIds.map(id => state.tasks.byId[id]))

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: DRAG_ACTIVATION_DISTANCE,
      },
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    const targetStatus = over.id as TaskStatus

    if (WIP_COLUMNS.includes(targetStatus)) {
      const tasksInTargetColumn = allTasks.filter(t => t.status === targetStatus)

      if (tasksInTargetColumn.length >= WIP_LIMIT) {
        alert(`Limite de WIP (${WIP_LIMIT} tarefas) atingido na coluna "${COLUMNS.find(c => c.status === targetStatus)?.title}".`)
        return
      }
    }

    dispatch(
      moveTask({
        id: active.id as string,
        to: over.id as TaskStatus,
      })
    )
  }

  function filterTasksByStatus(status: TaskStatus) {
    return visibleTasks.filter(
      (task: TaskWithComputedFields) => task.status === status
    )
  }

  return (
    <section className="mx-auto mt-6 max-w-7xl px-6">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:overflow-x-auto pb-6">
          {COLUMNS.map(column => (
            <TaskColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={filterTasksByStatus(column.status)}
            />
          ))}
        </div>
      </DndContext>
    </section>
  )
}