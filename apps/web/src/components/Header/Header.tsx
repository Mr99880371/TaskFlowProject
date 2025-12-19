import { Search } from 'lucide-react'
import Logo from '@/assets/Logo.png'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearch } from '@/store/filters/filters.slice'

export function Header() {
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.filters.search)

  return (
    <header className="x-auto flex max-w-full items-center gap-3 sm:gap-4 rounded-xl bg-white px-4 sm:px-6 py-3 shadow-sm">
      <img src={Logo} alt="Logo" className="h-10 w-10" />

      {/* Search */}
      <div className="relative flex-1">
        <input
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
          type="text"
          placeholder="Buscar"
          className="w-full rounded-full bg-gray-100 px-4 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-gray-300"
        />
        <Search
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </header>
  )
}
