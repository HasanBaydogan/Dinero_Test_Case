export function ToggleSwitch({ name, checked, onChange, label, error }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3 w-[315px] h-11 px-3 py-2 bg-white dark:bg-gray-800 border border-toggle-border dark:border-gray-600 rounded-[60px]">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={(e) => onChange(e)}
            className="sr-only peer"
          />
          <div className={`w-[51px] h-[31px] rounded-full relative transition-all duration-200 ${
            checked ? 'toggle-on' : 'bg-toggle-bg-off'
          }`}>
            <div className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white dark:bg-gray-200 rounded-full border border-gray-300 dark:border-gray-500 transition-all duration-200 ${
              checked ? 'translate-x-[20px]' : 'translate-x-0'
            }`}></div>
          </div>
        </label>
        {label && (
          <span className="text-toggle-text dark:text-gray-200 text-sm font-medium font-red-hat leading-toggle-label tracking-toggle-label whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="text-strawberry-red text-sm">{error}</p>
      )}
    </div>
  );
}