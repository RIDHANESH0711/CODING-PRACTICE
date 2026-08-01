public class lap {/*
   int ram =0;
   int graphics = 0;
   String a ="";
   int vram = 0;
   public static void main(String[]args){
    lap hello1 = new lap();
    hello1.ram= 100;
    hello1.graphics=40000;
    hello1.a ="namasthe";
    hello1.vram= 3;
    System.out.print(hello1.ram);


    

   }*/
    
}
import java.util.Scanner;

public class ReverseString {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // Reverse the string using StringBuilder
        String reverse = new StringBuilder(str).reverse().toString();

        System.out.println("Reversed String: " + reverse);

        sc.close();
    }
}
