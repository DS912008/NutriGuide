#include <stdio.h>

int main() {
    int a = 42;        // Declare and initialize an integer
    int *p = &a;       // Pointer p stores the address of a

    printf("Value of a: %d\n", a);       // Prints the value of a
    printf("Address of a (&a): %p\n", &a); // Prints the memory address of a
    printf("Value of p (address of a): %p\n", p); // Prints the value stored in pointer p (address of a)
    printf("Value at address p (*p): %d\n", *p); // Dereferences p to print the value of a
    printf("Address of p (&p): %p\n", &p);   // Prints the address of the pointer variable p

    return 0;
}
