import java.util.Scanner;
class RCB {
    public static void main(String[] args) {
      //  System.out.println("roopesh");
       /* Scanner a=new Scanner(System.in);
        int m=a.nextInt();
        int n=a.nextInt();
      for(int i=m;i<=n;i++){
        if(i%3==0 && i%5==0){
            System.out.println("RCB");
        }
        else if(i%3==0){
            System.out.println("RC");
        }
        else if(i%5==0){
            System.out.println("B");
        }
        else{
            System.out.println(i);
        }
    }
   // array                                                                                                                                                                                                                     ;
   Scanner a = new Scanner(System.in);
   int[] b = new int [5];
   for(int i=0;i<5;i++){
    b[i] = a.nextInt();
    
   }
   for(int i=0;i<5;i++){
   System.out.println(b[i]);
   }

 {
    Scanner si = new Scanner(System.in);
    int a = si.nextInt();
    int[] arr = new int[a];
    for(int i=0;i<a-1;i++){
        arr[i]=si.nextInt();

    }
    
    // switch case:
    Scanner a= new Scanner(System.in);
    char b = a.next().charAt(0);
    b = Character.toLowerCase(b);
    switch(b){
    case 'R':
        System.out.print("STOP");
        break;
    case 'Y':
        System.out.print("READY");
        break;
    case 'G':
        System.out.print("GO");
        break;
    default:
        System.out.print("INVALID SIGNAL");          
        */
    
    Scanner a = new Scanner(System.in);
    String b = a.nextLine();
    switch(b){
        case "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY":
            System.out.print("weekdays");
            break;
        case "SATURDAY","SUNDAY":
            System.out.print("weekend");
            break;
        default:
            System.out.print("invalid entry");  



    }


    }
    
  
   


   

}

