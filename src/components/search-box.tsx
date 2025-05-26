'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onSearch?: (value: string) => void
  suggestions?: string[]
  selectedTags?: string[]
  availableTags?: string[]
  onTagAdd?: (tag: string) => void
  onTagRemove?: (tag: string) => void
  className?: string
}

export function SearchBox({
  value,
  onChange,
  placeholder = "検索...",
  onSearch,
  suggestions = [],
  selectedTags = [],
  availableTags = [],
  onTagAdd,
  onTagRemove,
  className
}: SearchBoxProps) {
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [showTagFilter, setShowTagFilter] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(value)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    onSearch?.(suggestion)
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(value.toLowerCase()) &&
      suggestion.toLowerCase() !== value.toLowerCase()
  )

  const availableTagsFiltered = availableTags.filter(
    tag => !selectedTags.includes(tag)
  )

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              // 少し遅延させてクリックイベントを処理できるようにする
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            className="pl-10 pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onChange('')
                  inputRef.current?.focus()
                }}
                className="h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            {availableTags.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowTagFilter(!showTagFilter)}
                className="h-7 w-7 p-0"
              >
                <Filter className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        {/* 検索候補 */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-md z-50 max-h-60 overflow-y-auto">
            {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* 選択されたタグ */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
              onClick={() => onTagRemove?.(tag)}
            >
              {tag}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}

      {/* タグフィルター */}
      {showTagFilter && availableTagsFiltered.length > 0 && (
        <div className="mt-2 p-3 border rounded-md bg-muted/50">
          <h4 className="text-sm font-medium mb-2">タグで絞り込み</h4>
          <div className="flex flex-wrap gap-1">
            {availableTagsFiltered.slice(0, 20).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => {
                  onTagAdd?.(tag)
                  setShowTagFilter(false)
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
