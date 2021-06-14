<ul >
    @foreach ($units as $unit)
        <li>
            <code>
                <a href="{{route('showUnit',$unit->id)}}">{{$unit->name}}</a>
            </code>
            @if ($unit->children()->count())
                @include('partials.UnitsList',['units' => $unit->children])
            @endif
        </li>
    @endforeach
</ul>