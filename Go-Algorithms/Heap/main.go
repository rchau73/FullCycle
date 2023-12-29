package main

import (
	"fmt"
)

// MaxHeap Struct
type MaxHeap struct {
	array []int
}

// Insert
func (h *MaxHeap) Insert(key int) {
	h.array = append(h.array, key)
	h.maxHeapfyUp(len(h.array) - 1)
}

// Extract the top heap node
func (h *MaxHeap) Extract() int {
	if len(h.array) == 0 {
		fmt.Println("No data available to Extract!")
		return -1
	}

	extracted_key := h.array[0]
	last_element := len(h.array) - 1

	h.array[0] = h.array[last_element]
	h.array = h.array[:last_element]

	h.maxHeapfyDown(0)

	return extracted_key
}

// Rearrange the nodes bottom up when inserted
func (h *MaxHeap) maxHeapfyUp(index int) {
	for h.array[index] > h.array[h.parent(index)] {
		h.swap(index, h.parent(index))
		index = h.parent(index)
	}
}

func (h *MaxHeap) maxHeapfyDown(index int) {
	lastIndex := len(h.array) - 1
	l, r := h.left(index), h.right(index)
	for l <= lastIndex {
		childToCompare := l
		if h.array[r] > h.array[l] {
			childToCompare = r
		}
		if h.array[childToCompare] > h.array[index] {
			h.swap(childToCompare, index)
			index = childToCompare
			l, r = h.left(index), h.right(index)
		} else {
			return
		}
	}
}

// Get the parent node
func (h *MaxHeap) parent(index int) int {
	return (index - 1) / 2
}

// Get the child left node
func (h *MaxHeap) left(index int) int {
	return index*2 + 1
}

// Get the child right node
func (h *MaxHeap) right(index int) int {
	return index + 2 + 2
}

// Swat node contents
func (h *MaxHeap) swap(a int, b int) {
	h.array[a], h.array[b] = h.array[b], h.array[a]
}

func main() {
	myHeap := &MaxHeap{}

	fmt.Println(myHeap)

	buildHeap := []int{10, 20, 30, 6, 9, 99, 40, 70, 80, 70}

	for _, key := range buildHeap {
		myHeap.Insert(key)
		fmt.Println(myHeap)
	}

	fmt.Println(myHeap.Extract(), myHeap)
	fmt.Println(myHeap.Extract(), myHeap)
	fmt.Println(myHeap.Extract(), myHeap)
	fmt.Println(myHeap.Extract(), myHeap)

}
