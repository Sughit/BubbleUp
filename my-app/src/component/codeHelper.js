export const CODE = {
  /* ───────── I. Simple ───────── */
  bubble: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
bool sw=true;for(int i=0;i<n-1&&sw;i++){sw=false;for(int j=0;j<n-1-i;j++)if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;sw=true;}}
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*;
public class Main{
  static void bubble(int[] a){ boolean sw=true; for(int i=0;i<a.length-1 && sw;i++){ sw=false; for(int j=0;j<a.length-1-i;j++) if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t; sw=true; } } }
  public static void main(String[] args){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); bubble(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def bubble(a):
    sw = True
    i = 0
    while i < len(a)-1 and sw:
        sw = False
        for j in range(0, len(a)-1-i):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]; sw = True
        i += 1
n=int(input()); a=list(map(int,input().split()))
bubble(a); print(*a)`
  },
  selection: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
for(int i=0;i<n-1;i++){int p=i;for(int j=i+1;j<n;j++)if(a[j]<a[p])p=j; if(p!=i){int t=a[i];a[i]=a[p];a[p]=t;}}
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void sel(int[] a){ for(int i=0;i<a.length-1;i++){ int p=i; for(int j=i+1;j<a.length;j++) if(a[j]<a[p]) p=j; if(p!=i){int t=a[i];a[i]=a[p];a[p]=t;} } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); sel(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def selection(a):
    for i in range(len(a)-1):
        p=i
        for j in range(i+1,len(a)):
            if a[j]<a[p]: p=j
        if p!=i: a[i],a[p]=a[p],a[i]
n=int(input()); a=list(map(int,input().split()))
selection(a); print(*a)`
  },
  insertion: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
for(int i=1;i<n;i++){int key=a[i],j=i-1;while(j>=0&&a[j]>key){a[j+1]=a[j];j--;}a[j+1]=key;}
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void ins(int[] a){ for(int i=1;i<a.length;i++){ int key=a[i], j=i-1; while(j>=0&&a[j]>key){a[j+1]=a[j]; j--; } a[j+1]=key; } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); ins(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def insertion(a):
    for i in range(1,len(a)):
        key=a[i]; j=i-1
        while j>=0 and a[j]>key:
            a[j+1]=a[j]; j-=1
        a[j+1]=key
n=int(input()); a=list(map(int,input().split()))
insertion(a); print(*a)`
  },
  gnome: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000],i=1;cin>>n;for(int k=0;k<n;k++)cin>>a[k];
while(i<n){ if(i==0||a[i]>=a[i-1]) i++; else {int t=a[i];a[i]=a[i-1];a[i-1]=t; i--;}}
for(int k=0;k<n;k++)cout<<a[k]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void gnome(int[] a){ int i=1; while(i<a.length){ if(i==0||a[i]>=a[i-1]) i++; else {int t=a[i];a[i]=a[i-1];a[i-1]=t; i--; } } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); gnome(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def gnome(a):
    i=1
    while i<len(a):
        if i==0 or a[i]>=a[i-1]: i+=1
        else: a[i],a[i-1]=a[i-1],a[i]; i-=1
n=int(input()); a=list(map(int,input().split()))
gnome(a); print(*a)`
  },
  cocktail: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
bool sw=true;int s=0,e=n-1;while(sw){sw=false;for(int i=s;i<e;i++)if(a[i]>a[i+1]){int t=a[i];a[i]=a[i+1];a[i+1]=t;sw=true;} e--; if(!sw)break; sw=false; for(int i=e;i>s;i--)if(a[i]<a[i-1]){int t=a[i];a[i]=a[i-1];a[i-1]=t;sw=true;} s++; }
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void cocktail(int[] a){ boolean sw=true; int s=0,e=a.length-1; while(sw){ sw=false; for(int i=s;i<e;i++) if(a[i]>a[i+1]){int t=a[i];a[i]=a[i+1];a[i+1]=t; sw=true;} e--; if(!sw) break; sw=false; for(int i=e;i>s;i--) if(a[i]<a[i-1]){int t=a[i];a[i]=a[i-1];a[i-1]=t; sw=true;} s++; } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); cocktail(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def cocktail(a):
    sw=True; s=0; e=len(a)-1
    while sw:
        sw=False
        for i in range(s,e):
            if a[i]>a[i+1]: a[i],a[i+1]=a[i+1],a[i]; sw=True
        e-=1
        if not sw: break
        sw=False
        for i in range(e,s,-1):
            if a[i]<a[i-1]: a[i],a[i-1]=a[i-1],a[i]; sw=True
        s+=1
n=int(input()); a=list(map(int,input().split()))
cocktail(a); print(*a)`
  },
  oddeven: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
bool sorted=false;while(!sorted){sorted=true;for(int i=1;i<=n-2;i+=2) if(a[i]>a[i+1]){int t=a[i];a[i]=a[i+1];a[i+1]=t;sorted=false;} for(int i=0;i<=n-2;i+=2) if(a[i]>a[i+1]){int t=a[i];a[i]=a[i+1];a[i+1]=t;sorted=false;}}
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void oddEven(int[] a){ boolean sorted=false; while(!sorted){ sorted=true; for(int i=1;i<=a.length-2;i+=2) if(a[i]>a[i+1]){int t=a[i];a[i]=a[i+1];a[i+1]=t; sorted=false;} for(int i=0;i<=a.length-2;i+=2) if(a[i]>a[i+1]){int t=a[i];a[i]=a[i+1];a[i+1]=t; sorted=false;} } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); oddEven(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def odd_even(a):
    sorted=False
    while not sorted:
        sorted=True
        for i in range(1,len(a)-1,2):
            if a[i]>a[i+1]: a[i],a[i+1]=a[i+1],a[i]; sorted=False
        for i in range(0,len(a)-1,2):
            if a[i]>a[i+1]: a[i],a[i+1]=a[i+1],a[i]; sorted=False
n=int(input()); a=list(map(int,input().split()))
odd_even(a); print(*a)`
  },

  /* ───────── II. Eficiente ───────── */
  shell: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
int gap=1; while(gap<n/3) gap=3*gap+1; // Knuth
while(gap>=1){ for(int i=gap;i<n;i++){ int t=a[i],j=i; while(j>=gap&&a[j-gap]>t){a[j]=a[j-gap]; j-=gap;} a[j]=t; } gap/=3; }
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void shell(int[] a){ int n=a.length, gap=1; while(gap<n/3) gap=3*gap+1; while(gap>=1){ for(int i=gap;i<n;i++){ int t=a[i], j=i; while(j>=gap && a[j-gap]>t){ a[j]=a[j-gap]; j-=gap; } a[j]=t; } gap/=3; } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); shell(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def shell(a):
    n=len(a); gap=1
    while gap<n//3: gap=3*gap+1
    while gap>=1:
        for i in range(gap,n):
            t=a[i]; j=i
            while j>=gap and a[j-gap]>t:
                a[j]=a[j-gap]; j-=gap
            a[j]=t
        gap//=3
n=int(input()); a=list(map(int,input().split()))
shell(a); print(*a)`
  },
  comb: {
    cpp: `#include <iostream>
using namespace std;
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
int gap=n; bool sw=true; while(gap>1||sw){ gap=int(gap/1.3); if(gap<1)gap=1; sw=false; for(int i=0;i+gap<n;i++) if(a[i]>a[i+gap]){int t=a[i];a[i]=a[i+gap];a[i+gap]=t; sw=true;} }
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void comb(int[] a){ int gap=a.length; boolean sw=true; while(gap>1||sw){ gap=(int)(gap/1.3); if(gap<1) gap=1; sw=false; for(int i=0;i+gap<a.length;i++) if(a[i]>a[i+gap]){int t=a[i];a[i]=a[i+gap];a[i+gap]=t; sw=true;} } }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); comb(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def comb(a):
    gap=len(a); sw=True
    while gap>1 or sw:
        gap=int(gap/1.3)
        if gap<1: gap=1
        sw=False
        for i in range(0,len(a)-gap):
            if a[i]>a[i+gap]:
                a[i],a[i+gap]=a[i+gap],a[i]; sw=True
n=int(input()); a=list(map(int,input().split()))
comb(a); print(*a)`
  },
  merge: {
    cpp: `#include <iostream>
using namespace std;
void mergeArr(int a[],int l,int m,int r){int L[1000],R[1000];int n1=m-l+1,n2=r-m;for(int i=0;i<n1;i++)L[i]=a[l+i];for(int j=0;j<n2;j++)R[j]=a[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2)a[k++]=(L[i]<=R[j]?L[i++]:R[j++]);while(i<n1)a[k++]=L[i++];while(j<n2)a[k++]=R[j++];}
void msort(int a[],int l,int r){if(l>=r)return;int m=(l+r)/2; msort(a,l,m); msort(a,m+1,r); mergeArr(a,l,m,r);}
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i]; msort(a,0,n-1); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void merge(int[] a,int l,int m,int r){int n1=m-l+1,n2=r-m;int[] L=new int[n1],R=new int[n2];for(int i=0;i<n1;i++)L[i]=a[l+i];for(int j=0;j<n2;j++)R[j]=a[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2)a[k++]=(L[i]<=R[j]?L[i++]:R[j++]);while(i<n1)a[k++]=L[i++];while(j<n2)a[k++]=R[j++];}
  static void sort(int[] a,int l,int r){ if(l>=r)return; int m=(l+r)/2; sort(a,l,m); sort(a,m+1,r); merge(a,l,m,r); }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); sort(a,0,n-1); System.out.println(Arrays.toString(a)); }
}`,
    py: `def merge_sort(a):
    def rec(l,r):
        if l>=r: return
        m=(l+r)//2; rec(l,m); rec(m+1,r)
        i,j=l,m+1; tmp=[]
        while i<=m and j<=r:
            if a[i]<=a[j]: tmp.append(a[i]); i+=1
            else: tmp.append(a[j]); j+=1
        tmp+=a[i:m+1]+a[j:r+1]; a[l:r+1]=tmp
    rec(0,len(a)-1)
n=int(input()); a=list(map(int,input().split()))
merge_sort(a); print(*a)`
  },
  quick: {
    cpp: `#include <iostream>
using namespace std;
int part(int a[],int l,int r){int p=a[r], i=l-1;for(int j=l;j<r;j++) if(a[j]<=p){i++; int t=a[i];a[i]=a[j];a[j]=t;} int t=a[i+1];a[i+1]=a[r];a[r]=t; return i+1;}
void qsort(int a[],int l,int r){ if(l<r){int q=part(a,l,r); qsort(a,l,q-1); qsort(a,q+1,r);} }
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i]; qsort(a,0,n-1); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static int part(int[] a,int l,int r){int p=a[r],i=l-1;for(int j=l;j<r;j++) if(a[j]<=p){i++;int t=a[i];a[i]=a[j];a[j]=t;} int t=a[i+1];a[i+1]=a[r];a[r]=t; return i+1;}
  static void qs(int[] a,int l,int r){ if(l<r){ int q=part(a,l,r); qs(a,l,q-1); qs(a,q+1,r);} }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); qs(a,0,n-1); System.out.println(Arrays.toString(a)); }
}`,
    py: `def partition(a,l,r):
    p=a[r]; i=l-1
    for j in range(l,r):
        if a[j]<=p:
            i+=1; a[i],a[j]=a[j],a[i]
    a[i+1],a[r]=a[r],a[i+1]
    return i+1
def quick(a,l=0,r=None):
    if r is None: r=len(a)-1
    if l<r:
        q=partition(a,l,r)
        quick(a,l,q-1); quick(a,q+1,r)
n=int(input()); a=list(map(int,input().split()))
quick(a); print(*a)`
  },
  heap: {
    cpp: `#include <iostream>
using namespace std;
void heapify(int a[],int n,int i){int mx=i,l=2*i+1,r=2*i+2; if(l<n&&a[l]>a[mx])mx=l; if(r<n&&a[r]>a[mx])mx=r; if(mx!=i){int t=a[i];a[i]=a[mx];a[mx]=t; heapify(a,n,mx);} }
void heapsort(int a[],int n){ for(int i=n/2-1;i>=0;i--) heapify(a,n,i); for(int i=n-1;i>0;i--){int t=a[0];a[0]=a[i];a[i]=t; heapify(a,i,0);} }
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i]; heapsort(a,n); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void heapify(int[] a,int n,int i){int mx=i,l=2*i+1,r=2*i+2; if(l<n&&a[l]>a[mx])mx=l; if(r<n&&a[r]>a[mx])mx=r; if(mx!=i){int t=a[i];a[i]=a[mx];a[mx]=t; heapify(a,n,mx);} }
  static void heap(int[] a){ int n=a.length; for(int i=n/2-1;i>=0;i--) heapify(a,n,i); for(int i=n-1;i>0;i--){int t=a[0];a[0]=a[i];a[i]=t; heapify(a,i,0);} }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); heap(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def heapify(a,n,i):
    mx=i; l=2*i+1; r=2*i+2
    if l<n and a[l]>a[mx]: mx=l
    if r<n and a[r]>a[mx]: mx=r
    if mx!=i:
        a[i],a[mx]=a[mx],a[i]
        heapify(a,n,mx)
def heap(a):
    n=len(a)
    for i in range(n//2-1,-1,-1): heapify(a,n,i)
    for i in range(n-1,0,-1):
        a[0],a[i]=a[i],a[0]; heapify(a,i,0)
n=int(input()); a=list(map(int,input().split()))
heap(a); print(*a)`
  },

  /* ───────── III. Liniare ───────── */
  counting: {
    cpp: `#include <iostream>
using namespace std;
int c[1000001];
int main(){int n,a[1000],mx=0;cin>>n;for(int i=0;i<n;i++){cin>>a[i]; if(a[i]>mx)mx=a[i]; c[a[i]]++; }
int k=0; for(int v=0;v<=mx;v++) while(c[v]--) a[k++]=v;
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void counting(int[] a){ int mx=0; for(int x:a) if(x>mx) mx=x; int[] c=new int[mx+1]; for(int x:a) c[x]++; int k=0; for(int v=0;v<=mx;v++) while(c[v]-- > 0) a[k++]=v; }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); counting(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def counting(a):
    mx=max(a) if a else 0
    c=[0]*(mx+1)
    for x in a: c[x]+=1
    k=0
    for v in range(mx+1):
        while c[v]>0:
            a[k]=v; k+=1; c[v]-=1
n=int(input()); a=list(map(int,input().split()))
counting(a); print(*a)`
  },
  radix: {
    cpp: `#include <iostream>
using namespace std;
void countingDigit(int a[],int n,int exp){int c[10]={0},out[1000];for(int i=0;i<n;i++) c[(a[i]/exp)%10]++; for(int i=1;i<10;i++) c[i]+=c[i-1]; for(int i=n-1;i>=0;i--){int d=(a[i]/exp)%10; out[--c[d]]=a[i];} for(int i=0;i<n;i++) a[i]=out[i];}
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i]; int mx=0;for(int i=0;i<n;i++) if(a[i]>mx) mx=a[i]; for(int exp=1; mx/exp>0; exp*=10) countingDigit(a,n,exp); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void countDigit(int[] a,int exp){ int[] c=new int[10], out=new int[a.length]; for(int x:a) c[(x/exp)%10]++; for(int i=1;i<10;i++) c[i]+=c[i-1]; for(int i=a.length-1;i>=0;i--){ int d=(a[i]/exp)%10; out[--c[d]]=a[i]; } System.arraycopy(out,0,a,0,a.length); }
  static void radix(int[] a){ int mx=0; for(int x:a) if(x>mx) mx=x; for(int exp=1; mx/exp>0; exp*=10) countDigit(a,exp); }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); radix(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def count_digit(a,exp):
    c=[0]*10; out=[0]*len(a)
    for x in a: c[(x//exp)%10]+=1
    for i in range(1,10): c[i]+=c[i-1]
    for i in range(len(a)-1,-1,-1):
        d=(a[i]//exp)%10; c[d]-=1; out[c[d]]=a[i]
    a[:]=out
def radix(a):
    mx=max(a) if a else 0; exp=1
    while mx//exp>0:
        count_digit(a,exp); exp*=10
n=int(input()); a=list(map(int,input().split()))
radix(a); print(*a)`
  },
  bucket: {
    cpp: `#include <iostream>
using namespace std;
// Variantă simplă pt. numere întregi mici: mapare în "buckets" egale și insertion în fiecare.
void insertion(int b[],int m){ for(int i=1;i<m;i++){int k=b[i],j=i-1;while(j>=0&&b[j]>k){b[j+1]=b[j];j--;} b[j+1]=k;} }
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
int mx=0;for(int i=0;i<n;i++) if(a[i]>mx) mx=a[i];
const int B=10; int buck[B][1000], sz[B]={0};
for(int i=0;i<n;i++){int idx=(mx==0)?0:(a[i]*B)/(mx+1); buck[idx][sz[idx]++]=a[i];}
int k=0; for(int b=0;b<B;b++){ insertion(buck[b],sz[b]); for(int i=0;i<sz[b];i++) a[k++]=buck[b][i]; }
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void insertion(int[] b,int m){ for(int i=1;i<m;i++){int k=b[i],j=i-1;while(j>=0&&b[j]>k){b[j+1]=b[j];j--;} b[j+1]=k;} }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt();
    int mx=0; for(int x:a) if(x>mx) mx=x; int B=10; int[][] buck=new int[B][n]; int[] sz=new int[B];
    for(int x:a){ int idx=(mx==0)?0:(x*B)/(mx+1); buck[idx][sz[idx]++]=x; }
    int k=0; for(int b=0;b<B;b++){ insertion(buck[b],sz[b]); for(int i=0;i<sz[b];i++) a[k++]=buck[b][i]; }
    System.out.println(Arrays.toString(a)); }
}`,
    py: `def bucket(a):
    B=10; mx=max(a) if a else 0
    buckets=[[] for _ in range(B)]
    for x in a:
        idx=0 if mx==0 else (x*B)//(mx+1)
        buckets[idx].append(x)
    def insertion(b):
        for i in range(1,len(b)):
            k=b[i]; j=i-1
            while j>=0 and b[j]>k:
                b[j+1]=b[j]; j-=1
            b[j+1]=k
    k=0
    for b in buckets:
        insertion(b)
        for x in b:
            a[k]=x; k+=1
n=int(input()); a=list(map(int,input().split()))
bucket(a); print(*a)`
  },
  pigeonhole: {
    cpp: `#include <iostream>
using namespace std;
int holes[2000001];
int main(){int n,a[1000],mn=1e9,mx=-1e9;cin>>n;for(int i=0;i<n;i++){cin>>a[i]; if(a[i]<mn)mn=a[i]; if(a[i]>mx)mx=a[i]; }
int size=mx-mn+1; for(int i=0;i<n;i++) holes[a[i]-mn]++; int k=0; for(int i=0;i<size;i++) while(holes[i]--) a[k++]=i+mn;
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt();
    int mn=Integer.MAX_VALUE,mx=Integer.MIN_VALUE; for(int x:a){ if(x<mn)mn=x; if(x>mx)mx=x; } int size=mx-mn+1; int[] holes=new int[size];
    for(int x:a) holes[x-mn]++; int k=0; for(int i=0;i<size;i++) while(holes[i]-- > 0) a[k++]=i+mn;
    System.out.println(Arrays.toString(a)); }
}`,
    py: `def pigeonhole(a):
    mn=min(a); mx=max(a); size=mx-mn+1
    holes=[0]*size
    for x in a: holes[x-mn]+=1
    k=0
    for i in range(size):
        while holes[i]>0:
            a[k]=i+mn; k+=1; holes[i]-=1
n=int(input()); a=list(map(int,input().split()))
pigeonhole(a); print(*a)`
  },

  /* ───────── IV. Speciale ───────── */
  bitonic: {
  cpp: `
#include <bits/stdc++.h>
using namespace std;

static inline void compSwap(vector<int>& a, int i, int j, bool up) {
    if ((a[i] > a[j]) == up) swap(a[i], a[j]);
}

void bitonicMerge(vector<int>& a, int lo, int n, bool up) {
    if (n <= 1) return;
    int k = n / 2;
    for (int i = lo; i < lo + k; ++i) compSwap(a, i, i + k, up);
    bitonicMerge(a, lo, k, up);
    bitonicMerge(a, lo + k, k, up);
}

void bitonicSortRec(vector<int>& a, int lo, int n, bool up) {
    if (n <= 1) return;
    int k = n / 2;
    bitonicSortRec(a, lo, k, true);
    bitonicSortRec(a, lo + k, k, false);
    bitonicMerge(a, lo, n, up);
}

void bitonicSort(vector<int>& arr) {
    if (arr.empty()) return;
    // pad la următoarea putere a lui 2
    int n = arr.size();
    int p2 = 1; while (p2 < n) p2 <<= 1;
    vector<int> a = arr;
    int INF = numeric_limits<int>::max();
    a.resize(p2, INF);

    bitonicSortRec(a, 0, p2, true);

    // scriem primele n rezultate (ignoram padding-ul)
    for (int i = 0; i < n; ++i) arr[i] = a[i];
}

int main() {
    vector<int> v = {10, 30, 11, 20, 4, 330, 21};
    bitonicSort(v);
    for (int x : v) cout << x << " ";
    return 0;
}
`,

  java: `
import java.util.*;

public class BitonicSort {
    static void compSwap(int[] a, int i, int j, boolean up) {
        if ((a[i] > a[j]) == up) {
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    static void bitonicMerge(int[] a, int lo, int n, boolean up) {
        if (n <= 1) return;
        int k = n / 2;
        for (int i = lo; i < lo + k; i++) compSwap(a, i, i + k, up);
        bitonicMerge(a, lo, k, up);
        bitonicMerge(a, lo + k, k, up);
    }
    static void bitonicSortRec(int[] a, int lo, int n, boolean up) {
        if (n <= 1) return;
        int k = n / 2;
        bitonicSortRec(a, lo, k, true);
        bitonicSortRec(a, lo + k, k, false);
        bitonicMerge(a, lo, n, up);
    }
    public static void bitonicSort(int[] arr) {
        if (arr.length == 0) return;
        int n = arr.length, p2 = 1; while (p2 < n) p2 <<= 1;
        int[] a = Arrays.copyOf(arr, p2);
        Arrays.fill(a, n, p2, Integer.MAX_VALUE);
        bitonicSortRec(a, 0, p2, true);
        System.arraycopy(a, 0, arr, 0, n);
    }
    public static void main(String[] args) {
        int[] v = {10, 30, 11, 20, 4, 330, 21};
        bitonicSort(v);
        System.out.println(Arrays.toString(v));
    }
}
`,

  py: `
def _comp_swap(a, i, j, up):
    if (a[i] > a[j]) == up:
        a[i], a[j] = a[j], a[i]

def _bitonic_merge(a, lo, n, up):
    if n <= 1:
        return
    k = n // 2
    for i in range(lo, lo + k):
        _comp_swap(a, i, i + k, up)
    _bitonic_merge(a, lo, k, up)
    _bitonic_merge(a, lo + k, k, up)

def _bitonic_sort_rec(a, lo, n, up):
    if n <= 1:
        return
    k = n // 2
    _bitonic_sort_rec(a, lo, k, True)
    _bitonic_sort_rec(a, lo + k, k, False)
    _bitonic_merge(a, lo, n, up)

def bitonic_sort(arr):
    if not arr:
        return
    n = len(arr)
    p2 = 1
    while p2 < n:
        p2 <<= 1
    a = arr[:] + [float('inf')] * (p2 - n)
    _bitonic_sort_rec(a, 0, p2, True)
    arr[:] = a[:n]

# exemplu
v = [10, 30, 11, 20, 4, 330, 21]
bitonic_sort(v)
print(v)
`
},
oddevenmerge: {
  cpp: `
#include <bits/stdc++.h>
using namespace std;

static inline void compSwap(vector<int>& a, int i, int j, bool up) {
    if ((a[i] > a[j]) == up) swap(a[i], a[j]);
}

void oddEvenMerge(vector<int>& a, int lo, int n, bool up) {
    if (n <= 1) return;
    if (n == 2) { compSwap(a, lo, lo + 1, up); return; }
    int m = n / 2;
    oddEvenMerge(a, lo, m, up);
    oddEvenMerge(a, lo + m, m, up);
    // faza de interclasare odd-even
    for (int i = lo + 1; i + 1 < lo + n; i += 2)
        compSwap(a, i, i + 1, up);
}

void oddEvenMergeSort(vector<int>& a, int lo, int n, bool up) {
    if (n <= 1) return;
    int m = n / 2;
    oddEvenMergeSort(a, lo, m, up);
    oddEvenMergeSort(a, lo + m, m, up);
    oddEvenMerge(a, lo, n, up);
}

void oddEvenMergeSort(vector<int>& arr) {
    if (arr.empty()) return;
    int n = arr.size();
    int p2 = 1; while (p2 < n) p2 <<= 1;
    vector<int> a = arr;
    a.resize(p2, numeric_limits<int>::max());
    oddEvenMergeSort(a, 0, p2, true);
    for (int i = 0; i < n; ++i) arr[i] = a[i];
}

int main() {
    vector<int> v = {7, 3, 5, 2, 9, 1, 8};
    oddEvenMergeSort(v);
    for (int x : v) cout << x << " ";
    return 0;
}
`,

  java: `
import java.util.*;

public class OddEvenMergeSort {
    static void compSwap(int[] a, int i, int j, boolean up) {
        if ((a[i] > a[j]) == up) {
            int t = a[i]; a[i] = a[j]; a[j] = t;
        }
    }
    static void oddEvenMerge(int[] a, int lo, int n, boolean up) {
        if (n <= 1) return;
        if (n == 2) { compSwap(a, lo, lo + 1, up); return; }
        int m = n / 2;
        oddEvenMerge(a, lo, m, up);
        oddEvenMerge(a, lo + m, m, up);
        for (int i = lo + 1; i + 1 < lo + n; i += 2)
            compSwap(a, i, i + 1, up);
    }
    static void oddEvenMergeSortRec(int[] a, int lo, int n, boolean up) {
        if (n <= 1) return;
        int m = n / 2;
        oddEvenMergeSortRec(a, lo, m, up);
        oddEvenMergeSortRec(a, lo + m, m, up);
        oddEvenMerge(a, lo, n, up);
    }
    public static void oddEvenMergeSort(int[] arr) {
        if (arr.length == 0) return;
        int n = arr.length, p2 = 1; while (p2 < n) p2 <<= 1;
        int[] a = Arrays.copyOf(arr, p2);
        Arrays.fill(a, n, p2, Integer.MAX_VALUE);
        oddEvenMergeSortRec(a, 0, p2, true);
        System.arraycopy(a, 0, arr, 0, n);
    }
    public static void main(String[] args) {
        int[] v = {7, 3, 5, 2, 9, 1, 8};
        oddEvenMergeSort(v);
        System.out.println(Arrays.toString(v));
    }
}
`,

  py: `
def _cs(a, i, j, up):
    if (a[i] > a[j]) == up:
        a[i], a[j] = a[j], a[i]

def _odd_even_merge(a, lo, n, up):
    if n <= 1:
        return
    if n == 2:
        _cs(a, lo, lo + 1, up)
        return
    m = n // 2
    _odd_even_merge(a, lo, m, up)
    _odd_even_merge(a, lo + m, m, up)
    i = lo + 1
    while i + 1 < lo + n:
        _cs(a, i, i + 1, up)
        i += 2

def _odd_even_merge_sort(a, lo, n, up):
    if n <= 1:
        return
    m = n // 2
    _odd_even_merge_sort(a, lo, m, up)
    _odd_even_merge_sort(a, lo + m, m, up)
    _odd_even_merge(a, lo, n, up)

def odd_even_merge_sort(arr):
    if not arr:
        return
    n = len(arr)
    p2 = 1
    while p2 < n:
        p2 <<= 1
    a = arr[:] + [float('inf')] * (p2 - n)
    _odd_even_merge_sort(a, 0, p2, True)
    arr[:] = a[:n]

# exemplu
v = [7, 3, 5, 2, 9, 1, 8]
odd_even_merge_sort(v)
print(v)
`
},

  stooge: {
    cpp: `#include <iostream>
using namespace std;
void stooge(int a[],int l,int r){ if(l>=r) return; if(a[l]>a[r]){int t=a[l];a[l]=a[r];a[r]=t;} if(r-l+1>2){ int t=(r-l+1)/3; stooge(a,l,r-t); stooge(a,l+t,r); stooge(a,l,r-t);} }
int main(){int n,a[1000];cin>>n; for(int i=0;i<n;i++)cin>>a[i]; stooge(a,0,n-1); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void stooge(int[] a,int l,int r){ if(l>=r) return; if(a[l]>a[r]){int t=a[l];a[l]=a[r];a[r]=t;} if(r-l+1>2){ int t=(r-l+1)/3; stooge(a,l,r-t); stooge(a,l+t,r); stooge(a,l,r-t);} }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); stooge(a,0,n-1); System.out.println(Arrays.toString(a)); }
}`,
    py: `def stooge(a,l=0,r=None):
    if r is None: r=len(a)-1
    if l>=r: return
    if a[l]>a[r]: a[l],a[r]=a[r],a[l]
    if r-l+1>2:
        t=(r-l+1)//3
        stooge(a,l,r-t); stooge(a,l+t,r); stooge(a,l,r-t)
n=int(input()); a=list(map(int,input().split()))
stooge(a); print(*a)`
  },
  intro: { 
    cpp: `#include <iostream>
using namespace std;
void heapify(int a[],int n,int i){int mx=i,l=2*i+1,r=2*i+2; if(l<n&&a[l]>a[mx])mx=l; if(r<n&&a[r]>a[mx])mx=r; if(mx!=i){int t=a[i];a[i]=a[mx];a[mx]=t; heapify(a,n,mx);} }
void heapsort(int a[],int n){for(int i=n/2-1;i>=0;i--)heapify(a,n,i); for(int i=n-1;i>0;i--){int t=a[0];a[0]=a[i];a[i]=t; heapify(a,i,0);} }
int part(int a[],int l,int r){int p=a[r],i=l-1;for(int j=l;j<r;j++) if(a[j]<=p){i++;int t=a[i];a[i]=a[j];a[j]=t;} int t=a[i+1];a[i+1]=a[r];a[r]=t; return i+1;}
void intro(int a[],int l,int r,int depth){ if(l>=r) return; if(depth==0){ heapsort(a+l,r-l+1); return; } int q=part(a,l,r); intro(a,l,q-1,depth-1); intro(a,q+1,r,depth-1); }
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i]; int depth=0; for(int t=n;t>1;t/=2) depth++; depth*=2; intro(a,0,n-1,depth); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void heapify(int[] a,int n,int i){int mx=i,l=2*i+1,r=2*i+2; if(l<n&&a[l]>a[mx])mx=l; if(r<n&&a[r]>a[mx])mx=r; if(mx!=i){int t=a[i];a[i]=a[mx];a[mx]=t; heapify(a,n,mx);} }
  static void heap(int[] a){int n=a.length; for(int i=n/2-1;i>=0;i--)heapify(a,n,i); for(int i=n-1;i>0;i--){int t=a[0];a[0]=a[i];a[i]=t; heapify(a,i,0);} }
  static int part(int[] a,int l,int r){int p=a[r],i=l-1;for(int j=l;j<r;j++) if(a[j]<=p){i++;int t=a[i];a[i]=a[j];a[j]=t;} int t=a[i+1];a[i+1]=a[r];a[r]=t; return i+1;}
  static void intro(int[] a,int l,int r,int d){ if(l>=r) return; if(d==0){ int[] seg=Arrays.copyOfRange(a,l,r+1); heap(seg); for(int i=l;i<=r;i++) a[i]=seg[i-l]; return; } int q=part(a,l,r); intro(a,l,q-1,d-1); intro(a,q+1,r,d-1); }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); int d=0; for(int t=n;t>1;t/=2) d++; d*=2; intro(a,0,n-1,d); System.out.println(Arrays.toString(a)); }
}`,
    py: `def heapify(a,n,i):
    mx=i; l=2*i+1; r=2*i+2
    if l<n and a[l]>a[mx]: mx=l
    if r<n and a[r]>a[mx]: mx=r
    if mx!=i: a[i],a[mx]=a[mx],a[i]; heapify(a,n,mx)
def heap(a):
    n=len(a)
    for i in range(n//2-1,-1,-1): heapify(a,n,i)
    for i in range(n-1,0,-1):
        a[0],a[i]=a[i],a[0]; heapify(a,i,0)
def part(a,l,r):
    p=a[r]; i=l-1
    for j in range(l,r):
        if a[j]<=p: i+=1; a[i],a[j]=a[j],a[i]
    a[i+1],a[r]=a[r],a[i+1]; return i+1
def intro(a,l=0,r=None,depth=None):
    if r is None: r=len(a)-1
    if depth is None:
        depth=0; t=len(a)
        while t>1: t//=2; depth+=1
        depth*=2
    if l>=r: return
    if depth==0: seg=a[l:r+1]; heap(seg); a[l:r+1]=seg; return
    q=part(a,l,r); intro(a,l,q-1,depth-1); intro(a,q+1,r,depth-1)
n=int(input()); a=list(map(int,input().split()))
intro(a); print(*a)`
  },
  tim: { 
    cpp: `#include <iostream>
using namespace std;
void ins(int a[],int l,int r){ for(int i=l+1;i<=r;i++){int k=a[i],j=i-1;while(j>=l&&a[j]>k){a[j+1]=a[j];j--;} a[j+1]=k;} }
void mergeSeg(int a[],int l,int m,int r){int L[1000],R[1000];int n1=m-l+1,n2=r-m;for(int i=0;i<n1;i++)L[i]=a[l+i];for(int j=0;j<n2;j++)R[j]=a[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2)a[k++]=(L[i]<=R[j]?L[i++]:R[j++]);while(i<n1)a[k++]=L[i++];while(j<n2)a[k++]=R[j++];}
int main(){const int RUN=32; int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i];
for(int i=0;i<n;i+=RUN){int r=i+RUN-1; if(r>=n) r=n-1; ins(a,i,r);}
for(int size=RUN; size<n; size*=2) for(int l=0;l<n;l+=2*size){int m=min(l+size-1,n-1); int r=min(l+2*size-1,n-1); if(m<r) mergeSeg(a,l,m,r);}
for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void ins(int[] a,int l,int r){ for(int i=l+1;i<=r;i++){int k=a[i],j=i-1;while(j>=l&&a[j]>k){a[j+1]=a[j];j--;} a[j+1]=k;} }
  static void mergeSeg(int[] a,int l,int m,int r){int n1=m-l+1,n2=r-m;int[] L=new int[n1],R=new int[n2];for(int i=0;i<n1;i++)L[i]=a[l+i];for(int j=0;j<n2;j++)R[j]=a[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2)a[k++]=(L[i]<=R[j]?L[i++]:R[j++]);while(i<n1)a[k++]=L[i++];while(j<n2)a[k++]=R[j++];}
  public static void main(String[] s){ final int RUN=32; Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt();
    for(int i=0;i<n;i+=RUN){int r=Math.min(i+RUN-1,n-1); ins(a,i,r);}
    for(int size=RUN; size<n; size*=2) for(int l=0;l<n;l+=2*size){int m=Math.min(l+size-1,n-1), r=Math.min(l+2*size-1,n-1); if(m<r) mergeSeg(a,l,m,r);}
    System.out.println(Arrays.toString(a)); }
}`,
    py: `def insertion(a,l,r):
    for i in range(l+1,r+1):
        k=a[i]; j=i-1
        while j>=l and a[j]>k:
            a[j+1]=a[j]; j-=1
        a[j+1]=k
def merge_seg(a,l,m,r):
    L=a[l:m+1]; R=a[m+1:r+1]
    i=j=0; k=l
    while i<len(L) and j<len(R):
        if L[i]<=R[j]: a[k]=L[i]; i+=1
        else: a[k]=R[j]; j+=1
        k+=1
    while i<len(L): a[k]=L[i]; i+=1; k+=1
    while j<len(R): a[k]=R[j]; j+=1; k+=1
def timsort_simple(a, RUN=32):
    n=len(a)
    for i in range(0,n,RUN):
        insertion(a,i,min(i+RUN-1,n-1))
    size=RUN
    while size<n:
        for l in range(0,n,2*size):
            m=min(l+size-1,n-1); r=min(l+2*size-1,n-1)
            if m<r: merge_seg(a,l,m,r)
        size*=2
n=int(input()); a=list(map(int,input().split()))
timsort_simple(a); print(*a)`
  },
  flash: { 
    cpp: `#include <iostream>
using namespace std;
void insertion(int a[],int n){ for(int i=1;i<n;i++){int k=a[i],j=i-1;while(j>=0&&a[j]>k){a[j+1]=a[j];j--;} a[j+1]=k;} }
int main(){int n,a[1000];cin>>n;for(int i=0;i<n;i++)cin>>a[i]; if(n==0){return 0;}
int mn=a[0],mx=a[0],mxi=0; for(int i=1;i<n;i++){ if(a[i]<mn) mn=a[i]; if(a[i]>mx){mx=a[i];mxi=i;} }
if(mn==mx){ for(int i=0;i<n;i++) cout<<a[i]<<" "; return 0; }
const int m= (n<50? n: int(0.43*n)); int L[1001]={0};
for(int i=0;i<n;i++){ int k=(int)((long long)(m-1)*(a[i]-mn)/(mx-mn)); L[k]++; }
for(int k=1;k<m;k++) L[k]+=L[k-1];
int hold=a[mxi]; a[mxi]=a[0]; a[0]=hold;
int moves=0; int j=0; int k= m-1; int t=0; double fk= (double)(m-1)/(mx-mn);
while(moves<n-1){ while(j> L[k]-1){ j++; k=int(fk*(a[j]-mn)); } int ev=a[j];
while(j!=L[k]){ k=int(fk*(ev-mn)); int pos=--L[k]; int tmp=a[pos]; a[pos]=ev; ev=tmp; moves++; }
}
insertion(a,n); for(int i=0;i<n;i++)cout<<a[i]<<" ";}`,
    java: `import java.util.*; public class Main{
  static void insertion(int[] a){ for(int i=1;i<a.length;i++){int k=a[i],j=i-1;while(j>=0&&a[j]>k){a[j+1]=a[j];j--;} a[j+1]=k;} }
  public static void main(String[] s){ Scanner sc=new Scanner(System.in); int n=sc.nextInt(); int[] a=new int[n]; for(int i=0;i<n;i++) a[i]=sc.nextInt(); if(n==0){return;}
    int mn=a[0],mx=a[0],mxi=0; for(int i=1;i<n;i++){ if(a[i]<mn) mn=a[i]; if(a[i]>mx){mx=a[i];mxi=i;} }
    if(mn==mx){ System.out.println(Arrays.toString(a)); return; }
    int m = (n<50? n: (int)(0.43*n)); int[] L=new int[m]; for(int x:a){ int k=(int)((long)(m-1)*(x-mn)/(mx-mn)); L[k]++; }
    for(int k=1;k<m;k++) L[k]+=L[k-1];
    int tmp=a[mxi]; a[mxi]=a[0]; a[0]=tmp;
    int moves=0,j=0,k=m-1; double fk=(double)(m-1)/(mx-mn);
    while(moves<n-1){ while(j> L[k]-1){ j++; k=(int)(fk*(a[j]-mn)); } int ev=a[j];
      while(j!=L[k]){ k=(int)(fk*(ev-mn)); int pos=--L[k]; int t2=a[pos]; a[pos]=ev; ev=t2; moves++; } }
    insertion(a); System.out.println(Arrays.toString(a)); }
}`,
    py: `def insertion(a):
    for i in range(1,len(a)):
        k=a[i]; j=i-1
        while j>=0 and a[j]>k:
            a[j+1]=a[j]; j-=1
        a[j+1]=k
def flash(a):
    n=len(a)
    if n==0: return
    mn=min(a); mx=max(a)
    if mn==mx: return
    m = n if n<50 else int(0.43*n)
    L=[0]*m
    fk=(m-1)/(mx-mn)
    for x in a:
        k=int(fk*(x-mn)); L[k]+=1
    for k in range(1,m): L[k]+=L[k-1]
    j=0; k=m-1; moves=0
    while moves<n-1:
        while j> L[k]-1:
            j+=1; k=int(fk*(a[j]-mn))
        ev=a[j]
        while j!=L[k]:
            k=int(fk*(ev-mn)); L[k]-=1; pos=L[k]
            a[pos], ev = ev, a[pos]
            moves+=1
    insertion(a)
n=int(input()); a=list(map(int,input().split()))
flash(a); print(*a)`
  },
};

export const getLangsFor = (slug) => {
  const e = CODE[slug] || {};
  const res = [];
  if (e.cpp) res.push({ key: "cpp", label: "C++" });
  if (e.java) res.push({ key: "java", label: "Java" });
  if (e.py) res.push({ key: "py", label: "Python" });
  return res;
};

export function prettifyCStyle(code, { force = false } = {}) {
  if (!code) return code;

  const lines0 = code.split(/\r?\n/);
  const nlCount = lines0.length - 1;
  const maxLen = Math.max(0, ...lines0.map((l) => l.length));

  if (!force && nlCount > 10 && maxLen < 140) return code;

  let s = code
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n");

  const FOR_SEMI = "__FOR_SEMI__";
  s = s.replace(/for\s*\(([^)]*)\)/g, (m, inside) => {
    const safe = inside.replace(/;/g, FOR_SEMI);
    return m.replace(inside, safe);
  });

  s = s
    .replace(/\)\s*\{/g, ") {\n")
    .replace(/;/g, ";\n")
    .replace(/\{/g, "{\n")
    .replace(/\}/g, "}\n")
    .replace(/\n\s*\n+/g, "\n");

  s = s.replaceAll(FOR_SEMI, ";");

  // indentare
  const lines = s.split("\n");
  let depth = 0;
  const out = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      out.push("");
      continue;
    }

    if (line.startsWith("}")) depth = Math.max(0, depth - 1);
    out.push("  ".repeat(depth) + line);
    if (line.endsWith("{")) depth++;
  }

  return out.join("\n").replace(/\n\s*\n\s*\n+/g, "\n\n").trim();
}

export const getCode = (slug, langKey) => {
  const e = CODE[slug];
  if (!e) return null;
  let src = null;
  if (langKey === "cpp") src = e.cpp;
  else if (langKey === "java") src = e.java;
  else src = e.py;

  if (langKey === "cpp") {
    try {
      return prettifyCStyle(src, { force: true });
    } catch {
      return src;
    }
  }
  if (langKey === "java") {
    try {
      return prettifyCStyle(src, { force: false });
    } catch {
      return src;
    }
  }
  return src;
};

/* =========================================================
   Highlight pe linia curentă (dinamic) pe baza stepKey
   ========================================================= */

const RX = (s) => new RegExp(s, "i");

export const STEP_PATTERNS = {
  bubble: {
    init: [RX("bool\\s+sw|sw\\s*=\\s*true|sw\\s*=\\s*True")],
    outer: [RX("for\\s*\\(int\\s+i|for\\s+i\\s+in\\s+range|while\\s+i\\s*<")],
    compare: [RX("if\\s*\\(a\\[j\\]\\s*>\\s*a\\[j\\+1\\]\\)|if\\s*a\\[j\\]\\s*>\\s*a\\[j\\+1\\]")],
    swap: [RX("swap|int\\s+t\\s*=\\s*a\\[j\\]")],
    pass_done: [RX("for\\s*\\(int\\s+i|i\\s*\\+=")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  selection: {
    init: [RX("int\\s+p\\s*=\\s*i|p\\s*=\\s*i")],
    outer: [RX("for\\s*\\(int\\s+i|for\\s+i\\s+in\\s+range")],
    compare: [RX("if\\s*\\(a\\[j\\]\\s*<\\s*a\\[p\\]\\)|if\\s+a\\[j\\]\\s*<\\s*a\\[p\\]")],
    select_min: [RX("p\\s*=\\s*j|min\\s*=\\s*j")],
    swap: [RX("if\\(p!=i\\)|if\\s*p!=i|int\\s+t\\s*=\\s*a\\[i\\]")],
    pass_done: [RX("for\\s*\\(int\\s+i")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  insertion: {
    init: [RX("for\\s*\\(int\\s+i\\s*=\\s*1|for\\s+i\\s+in\\s+range\\(1")],
    pick_key: [RX("key\\s*=\\s*a\\[i\\]|key\\s*=\\s*a\\[i\\]|key=a\\[i\\]")],
    shift: [RX("a\\[j\\+1\\]\\s*=\\s*a\\[j\\]|a\\[j\\+1\\]=a\\[j\\]")],
    insert: [RX("a\\[j\\+1\\]\\s*=\\s*key|a\\[j\\+1\\]=key")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  gnome: {
    init: [RX("int\\s+i\\s*=\\s*1|i=1")],
    compare: [RX("a\\[i\\]\\s*>?=\\s*a\\[i-1\\]|a\\[i\\]\\s*>=\\s*a\\[i-1\\]")],
    swap: [RX("int\\s+t\\s*=\\s*a\\[i\\]|a\\[i\\],a\\[i-1\\]")],
    advance: [RX("i\\+\\+|i\\s*\\+=")],
    done: [RX("cout<<a\\[k\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  cocktail: {
    init: [RX("bool\\s+sw|sw=True|sw\\s*=\\s*true")],
    forward_pass: [RX("for\\s*\\(int\\s+i=s|for\\s*i\\s+in\\s+range\\(s")],
    backward_pass: [RX("for\\s*\\(int\\s+i=e|for\\s*i\\s+in\\s+range\\(e")],
    compare: [RX("if\\s*\\(a\\[i\\]\\s*>\\s*a\\[i\\+1\\]\\)|if\\s*a\\[i\\]\\s*>\\s*a\\[i\\+1\\]|if\\s*a\\[i\\]\\s*<\\s*a\\[i-1\\]")],
    swap: [RX("int\\s+t\\s*=\\s*a\\[i\\]|a\\[i\\],a\\[i\\+1\\]|a\\[i\\],a\\[i-1\\]")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  oddeven: {
    init: [RX("sorted\\s*=\\s*false")],
    odd_phase: [RX("for\\s*\\(int\\s+i=1|range\\(1")],
    even_phase: [RX("for\\s*\\(int\\s+i=0|range\\(0")],
    compare: [RX("if\\s*\\(a\\[i\\]\\s*>\\s*a\\[i\\+1\\]\\)|if\\s*a\\[i\\]\\s*>\\s*a\\[i\\+1\\]")],
    swap: [RX("int\\s+t\\s*=\\s*a\\[i\\]|a\\[i\\],a\\[i\\+1\\]")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  shell: {
    init: [RX("gap\\s*=\\s*1")],
    gap_init: [RX("while\\s*\\(gap<n/3\\)|while\\s+gap<n//3")],
    gap_loop: [RX("while\\s*\\(gap>=1\\)|while\\s+gap>=1")],
    pick_temp: [RX("int\\s+t\\s*=\\s*a\\[i\\]|t=a\\[i\\]")],
    shift: [RX("a\\[j\\]\\s*=\\s*a\\[j-gap\\]|a\\[j\\]=a\\[j-gap\\]")],
    insert: [RX("a\\[j\\]\\s*=\\s*t|a\\[j\\]=t")],
    gap_update: [RX("gap\\s*/=\\s*3|gap\\s*//=\\s*3")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  comb: {
    init: [RX("gap\\s*=\\s*n|gap=len\\(a\\)")],
    gap_update: [RX("gap\\s*=\\s*int\\(gap/1\\.3\\)|gap\\s*=\\s*Math|gap\\s*=\\s*\\(int\\)")],
    compare: [RX("if\\s*\\(a\\[i\\]\\s*>\\s*a\\[i\\+gap\\]\\)|if\\s*a\\[i\\]\\s*>\\s*a\\[i\\+gap\\]")],
    swap: [RX("int\\s+t\\s*=\\s*a\\[i\\]|a\\[i\\],a\\[i\\+gap\\]")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  merge: {
    init: [RX("void\\s+mergeArr|def\\s+merge_sort|static\\s+void\\s+merge")],
    split: [RX("msort\\(|rec\\(|sort\\(")],
    merge_begin: [RX("mergeArr\\(|merge\\(")],
    compare: [RX("L\\[i\\]\\s*<=\\s*R\\[j\\]|if\\s+a\\[i\\]\\s*<=\\s*a\\[j\\]")],
    write: [RX("a\\[k\\+\\+\\]|a\\[k\\]=|a\\[l:r\\+1\\]=|out")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  quick: {
    init: [RX("int\\s+part\\(|def\\s+partition|static\\s+int\\s+part")],
    pivot: [RX("p\\s*=\\s*a\\[r\\]|pivot\\s*=\\s*arr\\[r\\]|p=a\\[r\\]")],
    compare_pivot: [RX("if\\s*\\(a\\[j\\]\\s*<=\\s*p\\)|if\\s*a\\[j\\]\\s*<=\\s*p|if\\s*a\\[j\\]\\s*<=\\s*pivot|if\\s*a\\[j\\]\\s*<\\s*pivot")],
    swap: [RX("int\\s+t\\s*=\\s*a\\[i\\]|swap\\(")],
    partition: [RX("return\\s+i\\+1|return\\s+i\\+1")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  heap: {
    init: [RX("heapify\\(|def\\s+heapify")],
    build_heap: [RX("for\\s*\\(int\\s+i=n/2-1|for\\s+i\\s+in\\s+range\\(n//2-1")],
    heapify_compare: [RX("if\\(l<n|if\\s+l<n")],
    heapify_swap: [RX("if\\(mx!=i\\)|if\\s+mx!=i")],
    extract_swap: [RX("a\\[0\\]=a\\[i\\]|a\\[0\\],a\\[i\\]")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  counting: {
    init: [RX("int\\s+c\\[|counting\\(")],
    count: [RX("c\\[a\\[i\\]\\]\\+\\+|count\\[")],
    write: [RX("a\\[k\\+\\+\\]=v|a\\[k\\+\\+\\]\\s*=\\s*v|a\\[k\\]=v")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  radix: {
    init: [RX("countingDigit\\(|def\\s+radix")],
    digit_pass: [RX("for\\s*\\(int\\s+exp=1|while\\s+mx//exp")],
    counting_place: [RX("out\\[--c\\[d\\]\\]|out\\[--count\\[d\\]\\]")],
    write: [RX("a\\[i\\]=out\\[i\\]|a\\[:\\]=out")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  bucket: {
    init: [RX("buckets|buck\\[|def\\s+bucket")],
    bucket_place: [RX("buckets\\[idx\\]\\.append|buck\\[idx\\]")],
    bucket_sort: [RX("\\.sort\\(|insertion\\(")],
    write: [RX("a\\[k\\+\\+\\]=|a\\[k\\]=x")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  pigeonhole: {
    init: [RX("holes\\[|def\\s+pigeonhole")],
    count: [RX("holes\\[a\\[i\\]-mn\\]\\+\\+|holes\\[x-mn\\]\\+=1")],
    write: [RX("a\\[k\\+\\+\\]=i\\+mn|a\\[k\\]=i\\+mn")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
  stooge: {
    init: [RX("stooge\\(")],
    swap: [RX("if\\(a\\[l\\]>a\\[r\\]\\)|if\\s+a\\[l\\]>a\\[r\\]")],
    recurse: [RX("t=\\(r-l\\+1\\)/3|t=\\(r-l\\+1\\)//3")],
    done: [RX("cout<<a\\[i\\]|print\\(\\*a\\)|Arrays\\.toString")],
  },
};

export const getCodeLines = (slug, langKey) => {
  const code = getCode(slug, langKey) || "";
  return code.replace(/\r/g, "").split("\n");
};

export const findHighlightLine = (code, slug, langKey, stepKey) => {
  const lines = (code || "").replace(/\r/g, "").split("\n");
  if (!lines.length) return 0;

  const algo = STEP_PATTERNS[slug];
  const patterns = algo?.[stepKey];

  // fallback: dacă nu avem pattern pt stepKey, încearcă ceva generic
  const fallback = [
    RX("for\\s*\\("),
    RX("while\\s*\\("),
    RX("if\\s*\\("),
    RX("return"),
  ];

  const list = patterns?.length ? patterns : fallback;

  // căutăm prima linie care se potrivește
  for (let i = 0; i < lines.length; i++) {
    const s = lines[i];
    for (const r of list) {
      if (r.test(s)) return i;
    }
  }

  // dacă nu găsim nimic, highlight pe prima linie non-empty
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim()) return i;
  }
  return 0;
};

export const findHighlightRange = (code, slug, langKey, stepKey) => {
  const lines = (code || "").replace(/\r/g, "").split("\n");
  if (!lines.length) return { from: 0, to: 0 };

  // fallback: 1 linie
  const single = () => {
    const i = findHighlightLine(code, slug, langKey, stepKey);
    return { from: i, to: i };
  };

  // blocuri speciale (poți adăuga ușor și pentru alți pași)
  const blocks = {
    // Gnome swap block: int t=a[i]; a[i]=a[i-1]; a[i-1]=t; i--;
    gnome: {
      swap: {
        start: /int\s+t\s*=\s*a\[i\]\s*;/i,
        end: /i\s*--\s*;/i,
      },
    },

    bubble: {
      swap: {
        start: /int\s+t\s*=\s*a\[j\]\s*;/i,
        end: /sw\s*=\s*true\s*;|sw\s*=\s*True|swapped\s*=\s*true/i,
      },
    },

    selection: {
      swap: {
        start: /int\s+t\s*=\s*a\[i\]\s*;/i,
        end: /a\[p\]\s*=\s*t\s*;/i,
      },
    },

    insertion: {
      shift: {
        start: /a\[j\+1\]\s*=\s*a\[j\]\s*;/i,
        end: /j--\s*;/i,
      },
    },

    quick: {
      partition: {
        start: /int\s+t\s*=\s*a\[i\+1\]\s*;/i,
        end: /return\s+i\+1\s*;/i,
      },
    },
  };

  const algoBlocks = blocks[slug];
  const b = algoBlocks?.[stepKey];
  if (!b) return single();

  let from = -1;
  for (let i = 0; i < lines.length; i++) {
    if (b.start.test(lines[i])) {
      from = i;
      break;
    }
  }
  if (from === -1) return single();

  let to = from;
  for (let i = from; i < lines.length; i++) {
    if (b.end.test(lines[i])) {
      to = i;
      break;
    }
  }
  return { from, to };
};
