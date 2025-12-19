import { Filter, Plus } from 'lucide-react';

export function BoardActions() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">
        Gerenciador de Projetos
      </h1>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-lg
            border border-gray-200
            bg-white
            px-4 py-2
            text-sm font-medium text-gray-700
            hover:bg-gray-50
          "
        >
          <Filter size={16} />
          Filtros
        </button>

        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-lg
            bg-sky-600
            px-4 py-2
            text-sm font-medium text-white
            hover:bg-sky-700
          "
        >
          <Plus size={16} />
          Nova tarefa
        </button>
      </div>
    </div>
  );
}
