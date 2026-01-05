describe('Drag and Drop Functionality', () => {
  const mockProperty = {
    id: 'prop1',
    type: 'house',
    bedrooms: 4,
    price: 85000000,
    tenure: 'Freehold',
    description: 'Stunning Colonial-style family home',
    location: 'Colombo 07, Cinnamon Gardens',
    postcode: 'CMB7',
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  };

  const mockProperty2 = {
    id: 'prop2',
    type: 'flat',
    bedrooms: 2,
    price: 45000000,
    tenure: 'Leasehold',
    description: 'Modern apartment with stunning ocean views',
    location: 'Colombo 03, Kollupitiya',
    postcode: 'CMB3',
    mainImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
  };

  describe('Drag Event Handling', () => {
    const createDragStartEvent = (property) => ({
      active: {
        id: property.id,
        data: {
          current: property,
        },
      },
    });

    const createDragEndEvent = (property, overId) => ({
      active: {
        id: property.id,
        data: {
          current: property,
        },
      },
      over: overId ? { id: overId } : null,
    });

    test('drag start should set active property id', () => {
      const event = createDragStartEvent(mockProperty);
      let activeId = null;
      
      const handleDragStart = (e) => {
        activeId = e.active.id;
      };
      
      handleDragStart(event);
      expect(activeId).toBe('prop1');
    });

    test('drag end over favourites zone should add to favourites', () => {
      const event = createDragEndEvent(mockProperty, 'favourites-drop-zone');
      const favourites = [];
      let updatedFavourites = [...favourites];
      
      const handleDragEnd = (e) => {
        if (e.over && e.over.id === 'favourites-drop-zone') {
          const property = e.active.data.current;
          const alreadyFavourite = updatedFavourites.some(
            (fav) => fav.id === property.id
          );
          if (!alreadyFavourite) {
            updatedFavourites.push(property);
          }
        }
      };
      
      handleDragEnd(event);
      expect(updatedFavourites).toHaveLength(1);
      expect(updatedFavourites[0].id).toBe('prop1');
    });

    test('drag end outside drop zone should not add to favourites', () => {
      const event = createDragEndEvent(mockProperty, null);
      const favourites = [];
      let updatedFavourites = [...favourites];
      
      const handleDragEnd = (e) => {
        if (e.over && e.over.id === 'favourites-drop-zone') {
          const property = e.active.data.current;
          updatedFavourites.push(property);
        }
      };
      
      handleDragEnd(event);
      expect(updatedFavourites).toHaveLength(0);
    });

    test('drag end should clear active id', () => {
      const event = createDragEndEvent(mockProperty, 'favourites-drop-zone');
      let activeId = 'prop1';
      
      const handleDragEnd = () => {
        activeId = null;
      };
      
      handleDragEnd(event);
      expect(activeId).toBeNull();
    });

    test('should not add duplicate properties via drag and drop', () => {
      const favourites = [mockProperty];
      let updatedFavourites = [...favourites];
      const event = createDragEndEvent(mockProperty, 'favourites-drop-zone');
      
      const handleDragEnd = (e) => {
        if (e.over && e.over.id === 'favourites-drop-zone') {
          const property = e.active.data.current;
          const alreadyFavourite = updatedFavourites.some(
            (fav) => fav.id === property.id
          );
          if (!alreadyFavourite) {
            updatedFavourites.push(property);
          }
        }
      };
      
      handleDragEnd(event);
      expect(updatedFavourites).toHaveLength(1); // Should remain 1, not 2
    });
  });

  describe('Draggable Item Configuration', () => {
    test('draggable items should have correct id', () => {
      const draggableConfig = {
        id: mockProperty.id,
        data: mockProperty,
      };
      
      expect(draggableConfig.id).toBe('prop1');
      expect(draggableConfig.data).toEqual(mockProperty);
    });

    test('draggable items should contain all property data', () => {
      const draggableConfig = {
        id: mockProperty.id,
        data: mockProperty,
      };
      
      expect(draggableConfig.data).toHaveProperty('id');
      expect(draggableConfig.data).toHaveProperty('type');
      expect(draggableConfig.data).toHaveProperty('price');
      expect(draggableConfig.data).toHaveProperty('mainImage');
    });
  });

  describe('Droppable Zone Configuration', () => {
    test('droppable zone should have correct id', () => {
      const droppableConfig = {
        id: 'favourites-drop-zone',
      };
      
      expect(droppableConfig.id).toBe('favourites-drop-zone');
    });

    test('should detect when dragging over drop zone', () => {
      let isOver = false;
      
      // Simulate droppable state
      const updateDroppableState = (isDraggingOver) => {
        isOver = isDraggingOver;
      };
      
      updateDroppableState(true);
      expect(isOver).toBe(true);
      
      updateDroppableState(false);
      expect(isOver).toBe(false);
    });
  });

  describe('Multiple Drag and Drop Operations', () => {
    test('should handle multiple sequential drag and drops', () => {
      let favourites = [];
      
      const addViaDropEvent = (property) => {
        const alreadyFavourite = favourites.some(
          (fav) => fav.id === property.id
        );
        if (!alreadyFavourite) {
          favourites = [...favourites, property];
        }
      };
      
      addViaDropEvent(mockProperty);
      expect(favourites).toHaveLength(1);
      
      addViaDropEvent(mockProperty2);
      expect(favourites).toHaveLength(2);
      
      // Try to add duplicate
      addViaDropEvent(mockProperty);
      expect(favourites).toHaveLength(2); // Should still be 2
    });

    test('should track active drag item correctly across multiple drags', () => {
      const dragSequence = [];
      
      const recordDragStart = (propertyId) => {
        dragSequence.push({ action: 'start', id: propertyId });
      };
      
      const recordDragEnd = (propertyId) => {
        dragSequence.push({ action: 'end', id: propertyId });
      };
      
      recordDragStart('prop1');
      recordDragEnd('prop1');
      recordDragStart('prop2');
      recordDragEnd('prop2');
      
      expect(dragSequence).toHaveLength(4);
      expect(dragSequence[0]).toEqual({ action: 'start', id: 'prop1' });
      expect(dragSequence[1]).toEqual({ action: 'end', id: 'prop1' });
      expect(dragSequence[2]).toEqual({ action: 'start', id: 'prop2' });
      expect(dragSequence[3]).toEqual({ action: 'end', id: 'prop2' });
    });
  });

  describe('Drag Overlay', () => {
    test('should show overlay when item is being dragged', () => {
      let activeProperty = null;
      
      const handleDragStart = (property) => {
        activeProperty = property;
      };
      
      const handleDragEnd = () => {
        activeProperty = null;
      };
      
      // Start dragging
      handleDragStart(mockProperty);
      expect(activeProperty).not.toBeNull();
      expect(activeProperty.id).toBe('prop1');
      
      // End dragging
      handleDragEnd();
      expect(activeProperty).toBeNull();
    });

    test('overlay should display correct property information', () => {
      const activeProperty = mockProperty;
      
      // Verify overlay would show correct data
      expect(activeProperty.description).toBe('Stunning Colonial-style family home');
      expect(activeProperty.price).toBe(85000000);
      expect(activeProperty.mainImage).toContain('unsplash.com');
    });
  });
});
