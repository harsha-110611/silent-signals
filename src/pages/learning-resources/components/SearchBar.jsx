import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onFilterToggle }) => {
  return (
    <div className="flex gap-2 md:gap-3">
      <div className="flex-1 relative">
        <Input
          type="search"
          placeholder="Search resources, topics, or subjects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pr-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name="Search" size={18} className="text-muted-foreground" />
        </div>
      </div>
      <Button
        variant="outline"
        size="default"
        iconName="SlidersHorizontal"
        onClick={onFilterToggle}
        className="lg:hidden flex-shrink-0"
        aria-label="Toggle filters"
      />
    </div>
  );
};

export default SearchBar;